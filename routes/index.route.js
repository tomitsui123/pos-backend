var express = require('express')
var router = express.Router()
const logger = require('../utils/logger')
const recipeRouter = require('./recipe.route')
const orderRouter = require('./orders.route')
const userRouter = require('./users.route')

router.use('/recipe', recipeRouter)
router.use('/order', orderRouter)
router.use('/user', userRouter)

const healthPayload = () => ({
  status: 'ok',
  currentVersion: process.env.VERSION,
  updatedAt: process.env.UPDATED_AT,
  environment: process.env.NODE_ENV || 'development'
})

router.get('/health', function (_req, res, _next) {
  return res.json(healthPayload())
})

router.get('/', function (_req, res, _next) {
  logger.info('API is up and running')
  return res.json(healthPayload())
})

const notFound = (_req, res, _next) => {
  res.status(404).send({ message: 'API not found' })
}

function errorHandler(err, _req, res, _next) {
  const status = err.status || 500
  if (status >= 500) {
    logger.error(err.stack || err.message)
  }
  res.status(status).json({
    message: status >= 500 && process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
}

router.use(errorHandler)

router.get('*', notFound)
router.post('*', notFound)
router.put('*', notFound)
router.delete('*', notFound)

module.exports = router
module.exports.errorHandler = errorHandler
