// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BirthSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  people: [{
    name: String,
    birthday: Date
  }]
})

module.exports = mongoose.model('Birth', BirthSchema)
