const async = require('async')
const mongoQuery = require('../others/mongoQuery')
const _ = require('lodash')
const Recipe = require('../models/recipe.model')

const getAllRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.find()
    // const recipe = await Recipe.aggregate(mongoQuery.getRecipe).sort("category")
    return res.send(recipe)
  } catch (e) {
    next(e)
  }
}

const createNewItem = async (req, res, next) => {
  const input = req.body
  try {
    const recipe = await Recipe({ ...input })
    await recipe.save()
    return res.send({ message: 'Recipe has been saved', id: recipe._id })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getAllRecipe,
  createNewItem
}