const mongoose = require('mongoose')
const logSchema = new mongoose.Schema({
  remoteAddress: String,
  method: String,
  host: String,
  url: String,
  message: String,
  params: Object,
  query: Object,
  body: Object,
  status: Number,
  createdAt: Date,
})

module.exports = mongoose.model('logs', logSchema)