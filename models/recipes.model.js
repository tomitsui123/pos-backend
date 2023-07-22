const mongoose = require('mongoose')
const moment = require('moment')
const recipeSchema = new mongoose.Schema({
  itemCode: String,
  displayName: String,
  price: Number,
  category: String,
  imgSrcUrl: String,
  additionalCost: [{
    type: mongoose.ObjectId,
    ref: 'AdditionalCost'
  }],
  lastUpdated: { type: Date, default: moment() },
  options: [{
    type: mongoose.ObjectId,
    ref: 'OptionGroup'
  }]
})

module.exports = mongoose.model('recipes', recipeSchema)