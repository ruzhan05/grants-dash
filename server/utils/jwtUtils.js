const jwt = require("jsonwebtoken");
const {secretKey} = require("../jwtConfig");

function generateToken(user){
    const payload = {
        id: user._id,
        name: user.name
    }
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
}

module.exports = {
    generateToken
};