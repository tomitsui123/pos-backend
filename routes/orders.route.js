const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const { createOrder, getOrderByDate, deleteOrder } = require('../controllers/orders.controller')

router.get('/', async (_req, res, _next) => {
  // const orders = await orderController.getOrder()
  res.send({ hello: 'world' })
})

router.get('/:date', async (req, res, next) => {
  // date format: YYYY-MM-DD
  try {
    var { date } = req.params
    var orders = await getOrderByDate(date)
    if (orders instanceof Error) {
      logger.info(orders)
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


router.put('/:id', async (req, res, next) => {
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
  const message = await deleteOrder(_id)
  if (message instanceof Error) {
    return next(message)
  }
  return res.send({ message })
})

router.get('*', (req, res) => {
  res.status(404).send({ message: 'API not found' })
})

router.post('*', (req, res) => {
  res.status(404).send({ message: 'API not found' })
})

router.put('*', (req, res) => {
  res.status(404).send({ message: 'API not found' })
})

router.delete('*', (req, res) => {
  res.status(404).send({ message: 'API not found' })
})

module.exports = router