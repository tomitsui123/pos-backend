const mongoose = require('mongoose')
var Schema = mongoose.Schema
const recipeSchema = new mongoose.Schema({
  itemCode: String,
  displayName: String,
  price: Number,
  category: String
})

module.exports = mongoose.model('recipes', recipeSchema)