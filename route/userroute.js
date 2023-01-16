const express = require("express")
const userr = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const { usermodel } = require("../model/usermodel")

userr.get("/", (req, res) => {
    res.send("User Route working")
})

userr.post("/register", async (req, res) => {
    const {name,email,gender,password} = req.body
    try {
        bcrypt.hash(password, 10, async (err, hashpas) => {
            if (err) {
                console.log(err);
            } else {
                
                const user = new usermodel({name,email,gender,password:hashpas})
                await user.save()
                res.send({message:"Registered"})
            } 
            
        })

    } catch (error) {
        res.send({message:"Error while registering"})
        console.log({message:error.message})
    }
})

userr.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await usermodel.find({ email });
        if (user.length > 0) {

            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "hassan")
                    res.send({message:"Login Sucessfull", token: token})
                } else {
                    
                    res.send({"message":"Wrong Credentials"})
                }
                
            })
        } else {
            res.send({"message":"Invalid Cedentials"})
        }



    } catch (error) {
        res.send({message:error.message})
    }
})



module.exports = {userr}