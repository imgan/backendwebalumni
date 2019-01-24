const mongoose = require('mongoose');

const { Schema } = mongoose;

const agendaschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tema: {
    type: String,
  },
  tema_seo: String,
  isiAgenda: String,
  tempat: String,
  isDeleted: {
    type: Number,
    default: 0,
  },
  tglmulai: {
    type: Date,
  },
  tglselesai: Date,
  dibaca: Number,
  image: String,
  userpost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('Agenda', agendaschema);
