const express = require('express')
const router = express.Router()
const { getAllRecipe, createNewItem, editRecipe } = require('../controllers/recipe.controller')
const { jwtVerify } = require('../middlewares/verifyJwt.middleware')

router.get('/', getAllRecipe)
router.put('/:id', jwtVerify, editRecipe)
router.post('/', createNewItem)

module.exports = router