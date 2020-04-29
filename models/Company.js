const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Types.ObjectId,
      ref: 'Review',
    },
  ],
  generalRating: Number,
  address: String,
  placeId: String,
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = model('Company', schema)
