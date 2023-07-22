const mongoose = require('mongoose')
const additionalCostSchema = new mongoose.Schema({
  title: String,
  extraCost: Number,
})

module.exports = mongoose.model('AdditionalCost', additionalCostSchema)