const express = require('express')
const router = express.Router()
var moment = require('moment')
const multer = require('multer')
const upload = multer()
const _ = require('lodash')

const orderController = require('../controllers/orders')

router.get('/', async (_req, res, _next) => {
  const orders = await orderController.getOrder()
  res.send(orders)
})

router.get('/id::id', async (req, res, next) => {
  const { id } = req.params
  try {
    var orders = await orderController.getOrderById(id)
    if (orders instanceof Error) {
      orders = null
    }
    return res.send(orders ? [orders] : [])
  } catch(e) {
    return next(e)
  }
})

router.get('/date::date', async (req, res, next) => {
  try {
    var { date } = req.params
    var orders = await orderController.getOrderByDate(date)
    if (orders instanceof Error) {
      console.log(orders)
      orders = null
    }
    return res.send(orders ? orders : [])
  } catch(e) {
    return next(e)
  }
})

router.post('/', upload.array(), async (req, res) => {
  const input = req.body
  const createdId = await orderController.createOrder(input)
  if (createdId instanceof Error) {
    const { message } = createdId
    return res.status(500).send({ message })
  }
  return res.send({ message: 'Order has been saved', id: createdId })
})

router.post('/revert/:id', async (req, res, next) => {
  var { id } = req.params
  var out = await orderController.revertOrder(id)
  if (out instanceof Error) {
    return next(out)
  } else {
    return res.send({ message: `Order id:${id} has been reverted`, id })
  }
})

router.put('/:id', async (req, res, next) => {
  // TODO: compare changes
  // TODO: use mocha to prepare test script
  console.log('hi')
  const { id } = req.params
  const out = await orderController.updateOrder(id, req.body)
  if (out instanceof Error) {
    return next(out)
  } else {
    return res.send(out)
  }
})

router.delete('/:id', async (req, res, next) => {
  const _id = req.params.id
  const message = await orderController.deleteOrder(_id)
  if (message instanceof Error) {
    return next(message)
  }
  return res.send({ message })
})

router.get('*', (req, res, next) => {
  res.status(404).send({ message: 'API not found' })
})

router.post('*', (req, res, next) => {
  res.status(404).send({ message: 'API not found' })
})

router.put('*', (req, res, next) => {
  res.status(404).send({ message: 'API not found' })
})

router.delete('*', (req, res, next) => {
  res.status(404).send({ message: 'API not found' })
})

module.exports = router