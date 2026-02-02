# 🍎 NutriFlow - Smart Nutrition Tracker

**NutriFlow** is a full-stack web application designed to help users track their daily caloric intake, calculate Body Mass Index (BMI), and maintain a healthy lifestyle through data-driven insights.

## 🚀 Features

* **🔐 Secure Authentication:** User registration and login system with encrypted passwords and JWT tokens.
* **⚖️ BMI Calculator:** Instant BMI calculation with health classification categories.
* **🍎 Daily Food Log:** Add food items (grams/calories) and track progress against a daily goal.
* **📊 Real-time Progress:** Visual progress bar that updates as you log food.
* **💾 Data Persistence:** All user data is securely stored in a MongoDB database.
* **📱 Responsive Design:** Works on desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

This project was built using the **MEAN Stack** architecture (modified):

* **Frontend:** Angular (v16+), Bootstrap 5, HTML/CSS.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB.
* **Tools:** Git, Postman.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

1.  **Node.js** (v18 or higher) - [Download Here](https://nodejs.org/)
2.  **MongoDB Community Server** - [Download Here](https://www.mongodb.com/try/download/community)
3.  **Git** - [Download Here](https://git-scm.com/)

---

## 📥 Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/endekfilip/my-nutriflow-app.git](https://github.com/endekfilip/my-nutriflow-app.git)
cd my-nutriflow-app

```

### 2. Install Backend Dependencies

Open a terminal, navigate to the backend folder, and install the libraries:

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install

```

## How to Run the App

To run the application, you need to have two terminal windows open simultaneously.

### Terminal 1: Start the Server (Backend)
Navigate to the backend folder and run:

```bash
node server.js
```
You should see: Server running on port 3000 and MongoDB connected.

### Terminal 2: Start the Website (Frontend)
Navigate to the frontend folder and run:
```bash
npm start
```
Wait for the compilation to finish. It will automatically open your browser to: 👉 http://localhost:4200

📝 Author
Filip Endekovski

  Built as a university project for [FICT].