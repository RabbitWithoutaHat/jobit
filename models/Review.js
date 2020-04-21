const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  company: {
    type: Types.ObjectId,
    ref: 'Company',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  authorId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  author: String,
  companyName: String,
  position: String,
  review: String,
  questions: String,
  teamleadRating: Number,
  trainingRating: Number,
  teamRating: Number,
  workplaceRating: Number,
  taskRating: Number,
  online: Boolean,
  offline: Boolean,
  product: Boolean,
  remote: Boolean,
  office: Boolean,
  outsourcing: Boolean,
  schedule: Boolean,
  dms: Boolean,
  sport: Boolean,
  premium: Boolean,
  calls: Boolean,
  transit: Boolean,
  lunch: Boolean,
  english: Boolean,
  training: Boolean,
  relocation: Boolean,
  commonRating: Number,
})

module.exports = model('Review', schema)
