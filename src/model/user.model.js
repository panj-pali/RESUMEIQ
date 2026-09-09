const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique: [true, "user name is already exist"]
  },
  email: {  
  type: String,
    required: true,
  unique: [true, "email is already exist"], 
  },
  password: {
    type: String,
    required: true,
  }
  



},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;