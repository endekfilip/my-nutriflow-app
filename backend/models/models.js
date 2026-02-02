const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Define User Schema (NEW)
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // We will store hashed passwords here
});

// 2. Define Food Item Schema (Existing)
const foodItemSchema = new Schema({
    name: String,
    calories_per_100g: Number
});

// 3. Define User Input Schema (Existing)
// Note: We will eventually link this to a specific user, but let's keep it simple for now
const userInputSchema = new Schema({
    name: String,
    food_item_id: { type: Schema.Types.ObjectId, ref: 'FoodItem' },
    input_grams: Number,
    totalCalories: Number,
    date: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const FoodItem = mongoose.model('FoodItem', foodItemSchema);
const UserInput = mongoose.model('UserInput', userInputSchema);

module.exports = { User, FoodItem, UserInput };