const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  age: {
    type: Number,
    min: 18,
  },
  country: {
    type: String,
    min: 20,
  },
  state: {
    type: String,
    min: 15,
  },
  religion: {
    type: String,
    min: 15,
  },
  dob: {
    type: Date,
  },
  mobile: {
    type: Number,
    max: 10,
    unique: true,
  },
  result: {
    type: String,
    max: 10,
    unique: false,
  },
  last_attempted: {
    type: Date,
  },
  testGiven: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Users",userSchema);