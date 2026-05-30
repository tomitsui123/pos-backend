const moment = require('moment')
const Recipe = require('../models/recipes.model')
const optionGroup = require('../models/optionGroup.model')
const logger = require('../utils/logger')
const httpError = require('../utils/httpError')

const writableFields = [
  'itemCode',
  'displayName',
  'price',
  'category',
  'imgSrcUrl',
  'additionalCost',
  'options',
]

function normalizeRecipePayload(input) {
  if (!input || typeof input !== 'object') {
    throw httpError(400, 'recipe payload is required')
  }

  const invalidKey = Object.keys(input).find(key => !writableFields.includes(key))
  if (invalidKey) {
    throw httpError(400, `The key (${invalidKey}) is not allowed`)
  }

  if (typeof input.displayName !== 'string' || input.displayName.trim() === '') {
    throw httpError(400, 'displayName is required')
  }

  if (typeof input.price !== 'number' || Number.isNaN(input.price) || input.price < 0) {
    throw httpError(400, 'price must be a non-negative number')
  }

  if (input.category != null && typeof input.category !== 'string') {
    throw httpError(400, 'category must be a string')
  }

  return {
    ...input,
    itemCode: input.itemCode == null ? '' : String(input.itemCode).trim(),
    displayName: input.displayName.trim(),
    category: input.category == null ? '' : input.category.trim(),
    additionalCost: Array.isArray(input.additionalCost) ? input.additionalCost : [],
    options: Array.isArray(input.options) ? input.options : [],
  }
}

const getAllRecipe = async (req, res, next) => {
  try {
    recipe = await Recipe.find().populate('additionalCost').populate('options')
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
    let input = normalizeRecipePayload(req.body)
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
  try {
    const input = normalizeRecipePayload(req.body)
    const recipe = await Recipe({ ...input })
    await recipe.save()
    return res.send({ message: 'Recipe has been saved', id: recipe._id })
  } catch (e) {
    if (!e.status || e.status >= 500) {
      logger.info(e)
    }
    return next(e)
  }
}

module.exports = {
  getAllRecipe,
  createNewItem,
  editRecipe,
  normalizeRecipePayload
}
