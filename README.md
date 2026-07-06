# 🔐 MERN Auth App

A full-stack authentication application built using the MERN stack (MongoDB, Express, React, Node.js).
Users can register, login, and access protected routes using JWT authentication.

---

## 🚀 Features

* 🔑 User Registration & Login
* 🔐 JWT Authentication
* 👤 Protected Routes
* 💾 Token stored in localStorage
* 🎨 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Token)

---

## 📁 Project Structure

```
mern-auth-jwt/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/mern-auth-jwt.git
cd mern-auth-jwt
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

| Method | Route               | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/users/register | Register user    |
| POST   | /api/users/login    | Login user       |
| GET    | /api/users/me       | Get current user |

---

## 🔐 Authentication Flow

1. User logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes

---

## 📸 Screenshots

### Login Page
<img width="1899" height="978" alt="image" src="https://github.com/user-attachments/assets/043234aa-ebc1-497f-a9d7-3ac44dad424e" />




### Register Page

<img width="1500" height="600" alt="image" src="https://github.com/user-attachments/assets/04544ff8-b1ef-4fae-873f-7ad95605d398" />


---

## 🧠 Learning Outcomes

* Understanding JWT Authentication
* Handling Protected Routes in React
* Building REST APIs with Express
* Managing state using React Hooks

---

## 🙌 Author

**Asif**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
