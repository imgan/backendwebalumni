const mongoose = require('mongoose');

const { Schema } = mongoose;

const userschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
    default: null,
  },
  method: String,
  isLevel: {
    type: Number,
    default: null,
  },
  image: String,
});

module.exports = mongoose.model('User', userschema);
