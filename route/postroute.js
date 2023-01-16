const express = require("express");
const postr = express.Router();
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
require("dotenv").config();

const { postmodel } = require("../model/postmodel");

postr.get("/", async (req, res) => {
    try {
        let id = req.body.userID
        let postdata = await postmodel.find({userID:id})
        res.send(postdata)
    } catch (error) {
        res.send({message:error.message})
    }

//   res.send("Post Route working");
});

postr.post("/create", async (req, res) => {
  const payload = req.body;
  try {
      const postCreateData = await new postmodel(payload);
      await postCreateData.save()
      res.send({message:"Post Created"})
  } catch (error) {
    res.send({ message: "Error while creating" });
    console.log({ message: error.message });
  }
});

postr.patch("/update/:id", async (req, res) => {
    let payload = req.body;
    let ID = req.params.id

    try {      
          await postmodel.findByIdAndUpdate({ _id: ID }, payload);
          res.send({message:"Post Updated"})
      
        
    } catch (error) {
        console.log("Error")
    res.send({ message: error.message });
  }
});


postr.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id
  // let payload = req.body
  try {
    await postmodel.findByIdAndDelete({ _id: ID })
    res.send({message:"Post Deleted"})
  } catch (error) {
    res.send({message:error.message})
  }


})

postr.get("/", (req, res) => {
  
})

module.exports = { postr };
