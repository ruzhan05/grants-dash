// dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/grants")

app.post("/login", (req, res) => {
    const {name,password} = req.body;
    UserModel.findOne({name: name})
    .then(users => {
        if(users){
            if(users.password ===password){
                res.json("Success")
            }
            else{
                res.json("The password is incorrect")
            }
           
        }
        else{
            res.json("No record exists")
        }
    })
})

app.post('/register', (req,res)=>{
    UserModel.create(req.body)
    .then(users =>res.json(users))
    .catch(err => res.json(err))
})
app.listen(3002,()=>{
    console.log('Server is running on port 3002')
})

// Let us create our database (mysql)
