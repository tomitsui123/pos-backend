const moment = require('moment')
const Recipe = require('../models/recipes.model')
const optionGroup = require('../models/optionGroup.model')
const jwt = require('jsonwebtoken')

const getAllRecipe = async (req, res, next) => {
  try {
    recipe = await Recipe.find().populate('options')
    const options = await optionGroup.find()
    return res.status(200).json({
      recipe, options
    })
  } catch (e) {
    next(e)
  }
}

const editRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    let input = req.body
    const out = await Recipe.findOneAndUpdate({ _id: id }, {
      ...input, lastUpdated: moment(), "$set": {
        "options": input.options
      }
    }, { new: true })
    return res.status(200).json({
      message: 'Recipe has been updated',
      data: out
    })
  } catch (e) {
    console.error(e)
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
  createNewItem,
  editRecipe
}