import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

// server Port
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser()); //read a cookies
 
app.use(cors({
    origin:"http://localhost:5173", // frontend URL
    credentials:true // to allow a cookie
}));

app.use("/api/users",authRoutes)

connectDB();

app.listen(PORT,()=>{
    console.log(`Sever Started at ${PORT}`);
});