const { Schema } = require('mongoose');
const { model } = require('mongoose');

const kategorialbumschema = new Schema({
  nama_kategori: {
    type: String,
  },
  userpost: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Kategorialbum_schema', kategorialbumschema);
