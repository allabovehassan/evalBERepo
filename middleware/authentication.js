const express = require("express")
const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        const decoded = jwt.verify(token, "hassan", (err, decoded) => {

            if (decoded) {
                req.body.userID = decoded.userID
                next()

            } else {
                res.send({"message":"Kindly Login First"})
            }
            
        })
    } else {
        
        res.send({"message":"Please Login (not a valid token)"})
    }

}

module.exports = {authentication}