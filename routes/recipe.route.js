const express = require('express')
const router = express.Router()
const { getAllRecipe, createNewItem, editRecipe } = require('../controllers/recipe.controller')

router.get('/', getAllRecipe)
router.put('/:id', editRecipe)
router.post('/', createNewItem)

module.exports = router