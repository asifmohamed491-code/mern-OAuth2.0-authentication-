import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Step 1 - Redirect user to Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"], //scope means request pandrom intha details laam kodu nu 
    })
);

// Step 2 - Google redirects here after login
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/login",
    }),
    (req, res) => {
        // Generate Access Token
        const accessToken = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        // Generate Refresh Token
        const refreshToken = jwt.sign(
            { id: req.user._id },
            process.env.REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Save Refresh Token in Cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        // Redirect to Frontend
        res.redirect(
            `http://localhost:5173/oauth-success?token=${accessToken}`
        );
    }
);

export default router;