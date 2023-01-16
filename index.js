const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const {connection} = require("./config/db")
const {userr} = require("./route/userroute")
const {postr} = require("./route/postroute")
const {authentication} = require("./middleware/authentication")


app.use(express.json())
app.use("/users",userr)
app.use(authentication)
app.use("/posts",postr)



app.listen(process.env.port, async () => {

try {
    await connection
    console.log(`Connected to DB`);
} catch (error) {
    console.log({"Error":error.message});
}

    console.log(`Server is Running at ${process.env.port}`);
})