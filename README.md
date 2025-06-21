Overview

This project is a secure and production-ready User Authentication System built with Node.js, Express, and MongoDB. It supports a complete user flow from sign-up with email verification, JWT-based login, to secure password reset via email.

Features





User Registration: Users can sign up with a username, email, and password. Passwords are hashed using bcryptjs for security.



Email Verification: After registration, users receive an email with a verification link (via Mailtrap in development). Accounts remain inactive until verified.



Secure Login: Verified users can log in using JWT (JSON Web Tokens). Authenticated sessions include a secure token stored in cookies.



Protected Dashboard Route: After login, users are redirected to a secure dashboard route only accessible with a valid JWT.



Forgot & Reset Password: Users can request a password reset link via email. A secure tokenized link is sent, allowing password reset within a time-limited window.



Environment Variable Support: Uses .env file to securely store API keys, DB connections, and secret tokens.

Table of Contents





Installation



Usage



Technologies



Contributing



License



Contact

Installation





Clone the Repository:

git clone https://github.com/amrashraf15/MERN-AUTH.git
cd MERN-AUTH



Install Backend Dependencies:

cd backend
npm install



Set Up Environment Variables: Create a .env file inside the backend directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password

⚠️ Replace placeholders with actual credentials (e.g., from Mailtrap).



Start the Backend Server:

npm run start

The backend will run on: http://localhost:5000



Install Frontend Dependencies:

cd frontend
npm install



Start the React Frontend:

npm run dev

The frontend will run on: http://localhost:5173

Usage





Visit http://localhost:5173



Register a new account



Check Mailtrap inbox for the verification email



Log in and access the dashboard



Try "Forgot Password" to test reset functionality











Technologies

Backend





Node.js + Express – Server-side logic and API routing



MongoDB + Mongoose – NoSQL database and schema modeling



bcryptjs – Password hashing for user credentials



jsonwebtoken (JWT) – Authentication and secure session management



Mailtrap – Email service for testing verification/reset flows



cookie-parser – Handles HTTP cookies for storing auth tokens



crypto – Generates secure, random tokens for password resets



dotenv – Loads environment variables securely from .env



CORS – Enables secure cross-origin requests between client and server

Frontend





React – Component-based UI framework



react-router-dom – Declarative routing for React SPA



Zustand – Lightweight state management for authentication and UI state



react-hot-toast – Elegant and customizable toast notifications



Axios – HTTP client for making API calls to the backend

Contributing

We welcome contributions! Follow these steps to contribute:





Fork the repository.



Create a new branch (git checkout -b feature/your-feature).



Make your changes and commit (git commit -m 'Add your feature').



Push to the branch (git push origin feature/your-feature).



Open a Pull Request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact





Name: Amr Ashraf



Email: amrashraf1592@gmail.com



GitHub: amrashraf15



Project Link: MERN-AUTH
