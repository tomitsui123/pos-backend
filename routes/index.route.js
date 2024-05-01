var express = require('express')
var router = express.Router()
const logger = require('../utils/logger')
const recipeRouter = require('./recipe.route')
const orderRouter = require('./orders.route')
const userRouter = require('./users.route')

router.use('/recipe', recipeRouter)
router.use('/order', orderRouter)
router.use('/user', userRouter)

router.get('/', function (_req, res, _next) {
  logger.info('API is up and running')
  return res.json({
    currentVersion: process.env.VERSION,
    updatedAt: process.env.UPDATED_AT,
    currentEnvironment: process.env.NODE_ENV || 'development'
  })
})

const notFound = (_req, res, _next) => {
  res.status(404).send({ message: 'API not found' })
}

router.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({
    message: err.message,
  })
})

router.get('*', notFound)
router.post('*', notFound)
router.put('*', notFound)
router.delete('*', notFound)

module.exports = router
