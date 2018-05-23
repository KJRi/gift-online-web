// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String
  },
  price: {
    type: Number
  },
  time: {
    type: Date,
    default: Date.now()
  },
  username: {
    type: String,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  goodId: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Car', CarSchema)
