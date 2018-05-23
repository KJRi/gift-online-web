// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavSchema = new Schema({
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
  username: {
    type: String,
    require: true
  },
  goodId: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Fav', FavSchema)
