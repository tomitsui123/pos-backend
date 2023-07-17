
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  category: String,
  options: [String]
})

module.exports = mongoose.model('categories', categorySchema)