const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import User Model
const { User } = require('./models/models'); 

const app = express();
const port = 3000;
const SECRET_KEY = 'nutriflow_super_secret_key'; 

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/caloriesApp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// --- UPDATED CALORIES SCHEMA ---
// We added 'userId' to link food to a specific person
const caloriesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // <--- NEW
    name: String,
    grams: Number,
    totalCalories: Number,
    date: { type: Date, default: Date.now }
});

const Calories = mongoose.model('Calories', caloriesSchema);

// --- SECURITY MIDDLEWARE ---
// This function acts like a bouncer. It checks if the request has a valid ID card (Token).
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user; // Attach user info (id) to the request
        next(); // Allow them to pass
    });
};

// --- AUTH ROUTES (Public) ---

app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create token with User ID inside
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SECURE DATA ROUTES (Private) ---
// Note: We added 'authenticateToken' to all these routes

// 1. Add Calories (Tags the data with userId)
app.post('/api/saveCalories', authenticateToken, (req, res) => {
    const newCalories = new Calories({
        ...req.body,
        userId: req.user.id // <--- IMPORTANT: Saves the ID of the logged-in user
    });
    newCalories.save()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// 2. Get YOUR Calories (Filters by userId)
app.get('/api/getAllCalories', authenticateToken, (req, res) => {
    Calories.find({ userId: req.user.id }) // <--- Only find MY data
        .sort({ date: -1 })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// 3. Calculate YOUR Total
app.get('/api/calculateTotalCalories', authenticateToken, async (req, res) => {
    try {
        const calories = await Calories.find({ userId: req.user.id }); // <--- Only sum MY data
        const totalCalories = calories.reduce((sum, item) => sum + item.totalCalories, 0);
        res.status(200).json({ totalCalories });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// 4. Clear YOUR History
app.delete('/api/clearCalories', authenticateToken, async (req, res) => {
    try {
        await Calories.deleteMany({ userId: req.user.id }); // <--- Only delete MY data
        res.json({ message: 'History cleared!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});