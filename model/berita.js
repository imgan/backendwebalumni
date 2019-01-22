const mongoose = require('mongoose');

const { Schema } = mongoose;

const beritaschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  judul_album: {
    type: String,
  },
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
  headline: String,
  isiBerita: String,
  isAktif: {
    type: Number,
    default: null,
  },
  gambar: {
    type: String,
  },
  hitsalbum: {
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
});

module.exports = mongoose.model('Berita', beritaschema);
