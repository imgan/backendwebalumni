const mongoose = require('mongoose');

const { Schema } = mongoose;

const angkatanschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tahun_masuk: {
    type: String,
  },
  isDeleted: {
    type: Number,
    default: null,
  },
  userPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Angkatan', angkatanschema);
