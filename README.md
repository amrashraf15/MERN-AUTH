🔐 MERN Authentication System
A secure, full-featured User Authentication System built with Node.js, Express, MongoDB, and React. It supports complete user flows from registration with email verification, JWT-based login, to secure password reset via email.


📋 Table of Contents
📖 Overview
✨ Features
⚙️ Installation
🚀 Usage
📦 Technologiesx
📬 Contact

📖 Overview
This project is a secure and production-ready authentication system built with:

Node.js + Express on the backend

MongoDB for data storage

React on the frontend
It includes email verification, secure login using JWT, password reset via tokenized email links, and access to a protected dashboard.


✨ Features
User Registration: Sign up with a username, email, and hashed password

Email Verification: Account is activated after email confirmation (via Mailtrap)

Secure Login: Login via JWT stored in secure cookies

Protected Dashboard Route: Accessible only with valid JWT

Forgot & Reset Password: Email token link with secure reset form

Environment Variable Support: Uses .env for config, secrets, and SMTP credentials

⚙️ Installation
1. Clone the Repository

bash
نسخ
تحرير
git clone https://github.com/amrashraf15/MERN-AUTH.git
cd MERN-AUTH
2. Install Backend Dependencies

bash
نسخ
تحرير
cd backend
npm install
3. Set Up Environment Variables
Create a .env file in backend/:

env
نسخ
تحرير
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password
4. Start the Backend Server

bash
نسخ
تحرير
npm run start
Runs on http://localhost:5000

5. Install Frontend Dependencies

bash
نسخ
تحرير
cd ../frontend
npm install
6. Start the Frontend

bash
نسخ
تحرير
npm run dev
Runs on http://localhost:5173

🚀 Usage
Visit http://localhost:5173

Register a new account

Check Mailtrap inbox and verify your email

Log in and access the dashboard

Click "Forgot Password?" to test reset flow

📦 Technologies
Backend

Node.js + Express

MongoDB + Mongoose

bcryptjs

jsonwebtoken (JWT)

Mailtrap

cookie-parser

crypto

dotenv

CORS

Frontend

React

react-router-dom

Zustand

react-hot-toast

Axios


