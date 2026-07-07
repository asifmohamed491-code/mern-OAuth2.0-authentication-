import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import passport from "./config/passport.js";



// server Port
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(cookieParser()); //read a cookies

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true // to allow a cookie
}));

app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());




app.use("/api/users", authRoutes);
app.use("/api/auth", googleAuthRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Sever Started at ${PORT}`);
});