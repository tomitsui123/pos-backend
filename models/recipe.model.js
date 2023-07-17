const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
  itemCode: String,
  displayName: String,
  price: Number,
  category: String,
  imgSrcUrl: String
})

module.exports = mongoose.model('recipes', recipeSchema)