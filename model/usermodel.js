const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const usermodel = mongoose.model("usercollection", userschema)

module.exports = {usermodel}
