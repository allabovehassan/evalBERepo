const mongoose = require("mongoose");

const postschema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    userID:String
    
  },
  {
    versionKey: false,
  }
);

const postmodel = mongoose.model("postcollection", postschema);

module.exports = { postmodel };
