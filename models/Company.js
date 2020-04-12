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
  commonRate: Number,
  address: String,
  placeId: String,
})

module.exports = model('Company', schema)
