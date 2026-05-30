const express = require('express')
const router = express.Router()
const { getAllRecipe, createNewItem, editRecipe } = require('../controllers/recipe.controller')
const { jwtVerify } = require('../middlewares/verifyJwt.middleware')

router.get('/', getAllRecipe)
router.put('/:id', jwtVerify, editRecipe)
router.post('/', jwtVerify, createNewItem)

module.exports = router
