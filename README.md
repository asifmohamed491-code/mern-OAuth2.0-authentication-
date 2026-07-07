# 🔐 MERN OAuth2.0 Authentication

A complete authentication system built with the **MERN Stack** featuring traditional JWT authentication and Google OAuth 2.0 login using Passport.js.

---

## 🚀 Features

### 🔑 JWT Authentication

- User Registration
- User Login
- Password Hashing using bcryptjs
- JWT Access Token Authentication
- Refresh Token using HttpOnly Cookies
- Secure Protected Routes
- Logout Functionality

---

### 🌐 Google OAuth 2.0

- Sign in with Google
- Automatic Account Creation for New Google Users
- Existing User Login
- Google Profile Picture Support
- Google Account Information Retrieval
- Passport.js Authentication

---

### 👤 User Profile

- Display Username
- Display Email
- Google Profile Avatar
- Authentication Status
- Responsive User Dashboard

---

### 🎨 Responsive UI

- Modern Login Page
- Modern Register Page
- Responsive Navbar
- Home Dashboard
- Custom 404 Page
- Mobile Friendly Design
- Tailwind CSS Styling

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Passport Google OAuth20
- JWT
- bcryptjs
- Cookie Parser
- Express Session
- CORS
- dotenv

---

## 📂 Project Structure

```
nodejs-OAuth2.0
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
└── frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── utils
    │   └── App.jsx
    └── package.json
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/mern-oauth2-authentication.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_JWT_SECRET

REFRESH_SECRET=YOUR_REFRESH_SECRET

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## 🔐 Authentication Flow

### Email Authentication

```
Register
      ↓
Password Hashing
      ↓
MongoDB
      ↓
Login
      ↓
JWT Access Token
      ↓
Protected Routes
```

---

### Google OAuth Flow

```
Continue with Google
          ↓
Google Authentication
          ↓
Passport.js
          ↓
Check Existing User
          ↓
New User → Create Account
Existing User → Login
          ↓
Generate JWT
          ↓
Redirect to Frontend
          ↓
Authenticated Dashboard
```

---

## 📸 Screenshots

- Login Page
- Register Page
- Google OAuth Login
- User Dashboard
- Responsive Navbar

(Add your screenshots here)

---

## 🔮 Future Improvements

- Forgot Password
- Email Verification
- OTP Authentication
- GitHub OAuth
- Facebook Login
- Role Based Authentication
- User Profile Update
- Dark Mode
- Multi Device Login
- Account Settings

---

## 👨‍💻 Author

**Mohamed Asif**

GitHub: https://github.com/asifmohamed491-code

LinkedIn: https://www.linkedin.com/

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.