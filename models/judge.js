// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JudgeSchema = new Schema({
  rate: {
    type: Number,
    require: true
  },
  content: {
    type: String,
    require: true
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

module.exports = mongoose.model('Judge', JudgeSchema)
