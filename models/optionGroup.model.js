
const mongoose = require('mongoose')

const optionGroupSchema = new mongoose.Schema({
  title: String,
  type: String,
  option: [String]
})

module.exports = mongoose.model('OptionGroup', optionGroupSchema)