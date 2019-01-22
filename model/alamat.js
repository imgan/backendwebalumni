const { Schema } = require('mongoose');
const { model } = require('mongoose');

const alamatschema = new Schema({
  _id: Schema.Types.ObjectId,
  alamat: {
    type: String,
  },
});

module.exports = model('Alamat', alamatschema);
