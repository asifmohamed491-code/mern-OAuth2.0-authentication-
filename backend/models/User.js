import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,  //to avoid this spacing problem to store "   Asif   " to remove space extra unwanted spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        default: null,
    },
    googleId: {   // every user to provide unique key by google
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: "", //profile photo by google account
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },

}, { timestamps: true });

// Hash password only if it exists
userSchema.pre("save", async function () {
    if (!this.password || !this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;