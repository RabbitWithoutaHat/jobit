const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  about: {
    type: String,
  },
  siteUrl: {
    type: String,
  },
  gitUrl: {
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
