//import mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Create Schema Object
const Schema = mongoose.Schema;
//Create Schema
const userSchema = new Schema({
  email: { type: String },
  password: { type: String }
});

//Hashing the password
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(userSchema.password, salt, (err, hash) => {
//     if (err) {
//       console.log(err);
//     }
//     userSchema.password = hash;
//   });
// });
//create Model
const User = mongoose.model("user", userSchema);
//Export
module.exports = User;
