// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  address: [{
    name: String,
    location: Array,
    detail: String,
    phoneNum: String
  }]
})

module.exports = mongoose.model('Address', AddressSchema)
