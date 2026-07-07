import passport from "passport"; //managing third party authentication
import { Strategy as GoogleStrategy } from "passport-google-oauth20";//entha login use pandrom nu define pandrom 

import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  //like password
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({
          googleId: profile.id,  //googleId unique id ithu moolama thaan match pandrom namma
        });

        // If not found, create a new user 
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id, 
            avatar: profile.photos[0].value,
            provider: "google",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport; 