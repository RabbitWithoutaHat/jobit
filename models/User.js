const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nick: {
    type: String,
  },
  about: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = model('User', schema);