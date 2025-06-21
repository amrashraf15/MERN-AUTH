# 🔐 MERN Authentication System

A secure, full-featured User Authentication System built with Node.js, Express, MongoDB, and React. It supports full user workflows including registration with email verification, JWT-based login, and password reset via secure email links.

![Create Account Screenshot](D:\Football\projects\MERN-AUTH-V2\frontend\src\assets\createaccount.png) <!-- Update path as necessary -->

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Technologies](#-technologies)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Credits](#-credits)

---

## 📖 Overview

This project is a secure and production-ready authentication system built using:

- **Node.js + Express** (Backend)
- **MongoDB** (Database)
- **React** (Frontend)

### Key Capabilities

- Email verification
- Secure JWT-based authentication
- Password reset via tokenized links
- Protected dashboard route

---

## ✨ Features

- ✅ **User Registration**: Sign up using full name, email, and secure hashed password
- ✅ **Email Verification**: Activate accounts via confirmation email (uses Mailtrap)
- ✅ **JWT Login**: Authenticated via secure HTTP-only cookies
- ✅ **Protected Routes**: Access restricted to verified users only
- ✅ **Forgot & Reset Password**: Tokenized link with secure reset form
- ✅ **Environment Configuration**: Fully configurable via `.env` variables

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/amrashraf15/MERN-AUTH.git
cd MERN-AUTH


