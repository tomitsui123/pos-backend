const express = require('express')
const router = express.Router()
const { getAllRecipe, createNewItem, editRecipe } = require('../controllers/recipe.controller')
const { jwtVerify } = require('../middlewares/verifyJwt.middleware')
const { writeLimiter } = require('../config/rateLimit')

router.get('/', getAllRecipe)
router.put('/:id', writeLimiter, jwtVerify, editRecipe)
router.post('/', writeLimiter, jwtVerify, createNewItem)

module.exports = router
