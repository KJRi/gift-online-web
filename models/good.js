// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodSchema = new Schema({
  title: {
    type: String,
    unique: true,
    require: true
  },
  imageUrl: {
    type: Array
  },
  price: {
    type: Number
  },
  tag: {
    type: String
  }
})

module.exports = mongoose.model('Good', GoodSchema)
