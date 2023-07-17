const express = require('express')
const router = express.Router()
const { getAllRecipe, createNewItem } = require('../controllers/recipe.controller')

router.get('/', getAllRecipe)

router.post('/', createNewItem)

module.exports = router