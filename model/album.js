const mongoose = require('mongoose');

const { Schema } = mongoose;

const albumschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  judul_album: {
    type: String,
  },
  album_seo: {
    type: String,
  },
  keterangan: {
    type: String,
  },
  gambar: {
    type: String,
  },
  isAktif: {
    type: String,
  },
  hitsalbum: {
    type: String,
  },
  isDeleted: {
    type: Number,
  },
  id_kategori_album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'kategori_album',
  },
});

module.exports = mongoose.model('Album', albumschema);
