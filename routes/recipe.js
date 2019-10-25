const async = require('async')
const mongoose = require('mongoose')
const mongoQuery = require('../others/mongoQuery')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Categories = require('../models/categories')

router.get('/', async (_req, res) => {
  try {
    const recipe = await Recipe.aggregate(mongoQuery.getRecipe).sort("category")
    return res.send(recipe)
  } catch(e) {
    console.log(e)
  }
})

module.exports = router