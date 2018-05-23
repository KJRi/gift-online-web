// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
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
  },
  address: {
    name: String,
    location: Array,
    detail: String,
    phoneNum: String
  }
})

module.exports = mongoose.model('Order', OrderSchema)
