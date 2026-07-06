import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import jwt from "jsonwebtoken";



const router = express.Router();


// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        // userExits to throw error
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        // to show users data
        const user = await User.create({ username, email, password });

       res.status(201).json({
        id:user._id,
        username:user.username,
        email:user.email,
        message:"User registered successfully",
       });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});


// Login
router.post('/login', async (req, res) => {
const { email, password } = req.body;

try {
    // validation
    if (!email || !password) {
        return res.status(400).json({ 
            message: "Please fill all the fields" 
        });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ 
            message: "Invalid credentials" 
        });
    }

    //  check password 
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(400).json({ 
            message: "Invalid credentials" 
        });
    }

    // generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // set cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    //  response
    res.status(200).json({
        accessToken,
        id: user._id,
        username: user.username,
        email: user.email,
    });

} catch (err) {
    console.error("LOGIN ERROR:", err.message); // 🔥 debug
    res.status(500).json({ message: "Server error" });
}


});


// /refresh
router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" })
    }
    try {
        // verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        // generate new access token 
        const newAccesToken = generateAccessToken(decoded.id);

        res.json({ accessToken: newAccesToken });
    }
    catch(err){
        return res.status(403).json({message:"Invalid refresh token"});
    }
})

// Logout
router.post("/logout", (req, res) => {
    res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ message: "Logged out successfully" });
})

// Me
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user)
});





// Generating JWT token
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
}


export default router;