const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  autor: {
    type: Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: Types.ObjectId,
    ref: 'Company',
  },
  date: Date,
  text: String,
  rate: Number,
});

module.exports = model('Review', schema);
