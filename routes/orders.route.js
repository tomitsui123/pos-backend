const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const _ = require('lodash')

const { createOrder, getOrder, getOrderById, getOrderByDate, deleteOrder, updateOrder } = require('../controllers/orders.controller')

router.get('/', async (_req, res, _next) => {
  const orders = await getOrder()
  res.send(orders)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    var orders = await getOrderById(id)
    if (orders instanceof Error) {
      orders = null
    }
    return res.send(orders ? [orders] : [])
  } catch (e) {
    return next(e)
  }
})

router.get('/:date', async (req, res, next) => {
  // date format: YYYY-MM-DD
  try {
    var { date } = req.params
    var orders = await getOrderByDate(date)
    if (orders instanceof Error) {
      console.log(orders)
      orders = null
    }
    return res.send(orders ? orders : [])
  } catch (e) {
    return next(e)
  }
})

router.post('/', upload.array(), createOrder)

router.post('/revert/:id', async (req, res, next) => {
  var { id } = req.params
  var out = await revertOrder(id)
  if (out instanceof Error) {
    return next(out)
  } else {
    return res.send({ message: `Order id:${id} has been reverted`, id })
  }
})

router.put('/:id', updateOrder)

router.delete('/:id', async (req, res, next) => {
  const _id = req.params.id
  const message = await deleteOrder(_id)
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