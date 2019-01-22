const { Schema } = require('mongoose');
const { model } = require('mongoose');

const kategoriberitaschema = new Schema({
  nama_kategori: {
    type: String,
  },
  isDeleted: Number,
  userpost: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = model('Kategoriberitaschema', kategoriberitaschema);
