const jwt = require("jsonwebtoken");
const { secretKey } = require("../jwtConfig");

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        starredGrants: user.starredGrants
    }
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = {
    generateToken
};