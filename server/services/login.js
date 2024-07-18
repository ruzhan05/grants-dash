const bcrypt = require("bcrypt");
const User = require("../models/Users");
const { generateToken } = require("../utils/jwtUtils");

async function verifyUser(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }
        const isPasswwordValid = bcrypt.compare(password, existingUser.password);
        if (!isPasswwordValid) {
            console.log("wrong password")
            throw new Error("Incorrect password");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        console.log("Login error:", error.message);
        throw new Error("Invalid credentials");
    }
}
module.exports = {
    verifyUser
}