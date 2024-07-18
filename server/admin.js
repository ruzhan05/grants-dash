const User = require("./models/Users");
const bcrypt = require("bcrypt");

async function createAdmin(){
    try {
        const existAdmin = await User.findOne({name: "admin1234"});
        if(!existAdmin){
            new User({
                
            })
        }
        else (
            console.log("Admin Already Exist")
        )
    } catch (error) {
        console.log(error.message)
    }
}