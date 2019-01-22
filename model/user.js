const mongoose = require('mongoose');

const { Schema } = mongoose;

const userschema = new Schema({
  phone: {
    type: String,
  },
  username: {
    type: String,
    allowNull: false,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  isDeleted: {
    type: Number,
    default: 0,
  },
  isLevel: {
    type: Number,
    default: 0,
  },
  image: String,
});

module.exports = mongoose.model('User', userschema);
