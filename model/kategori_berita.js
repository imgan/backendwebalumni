const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const kategoriberitaschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nama_kategori: {
    type: String,
  },
  isDeleted: Number,
  userPost: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = model('Kategoriberitaschema', kategoriberitaschema);
