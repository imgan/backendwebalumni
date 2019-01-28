const mongoose = require('mongoose');

const { Schema } = mongoose;

const beritaschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_kategori_berita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'kategori_berita',
  },
  judul: {
    type: String,
  },
  sub_judul: {
    type: String,
  },
  youtube: {
    type: String,
  },
  judul_seo: String,
  headline: {
    type: Number,
    default: null,
  },
  isiBerita: String,
  isAktif: {
    type: Number,
    default: null,
  },
  gambar: {
    type: String,
  },
  isDeleted: {
    type: Number,
    default: null,
  },
  id_kategori_album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'kategori_album',
  },
  userApprove: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Berita', beritaschema);
