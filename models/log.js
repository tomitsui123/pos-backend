const mongoose = require('mongoose')
var Schema = mongoose.Schema
const logSchema = new mongoose.Schema({
  datetime: Date,
  action: String,
  changedItems: Object
})

module.exports = mongoose.model('log', logSchema)