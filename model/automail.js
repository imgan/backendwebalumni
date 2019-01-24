const { Schema } = require('mongoose');
const { model } = require('mongoose');

const automailschema = new Schema({
  _id: Schema.Types.ObjectId,
  subject: String,
  message: {
    type: String,
  },
  userpost: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Automail', automailschema);
