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
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.send("Google Login Success");
  }
);

export default router;