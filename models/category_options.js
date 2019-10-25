
const mongoose = require('mongoose')

const categoryOptionSchema = new mongoose.Schema({
  title: String,
  type: String,
  option: [String]
})

module.exports = mongoose.model('category_options', categoryOptionSchema)