const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const logger = require('../utils/logger')
const { jwtVerify } = require('../middlewares/verifyJwt.middleware')

const { createOrder, getOrderByDate, updateOrder, deleteOrder, revertOrder } = require('../controllers/orders.controller')

router.get('/', async (req, res, next) => {
  try {
    const { date } = req.query
    if (!date) {
      return res.status(400).send({ message: 'date query is required' })
    }
    var orders = await getOrderByDate(date)
    const total = orders.reduce((acc, cur) => {
      const { itemList } = cur
      const _total = itemList.reduce((acc1, cur1) => {
        return acc1 + cur1.menuProperty.price * cur1.amount
      }, 0)
      return acc + _total
    }, 0)
    return res.send({ orders, totalSales: total })
  } catch (e) {
    return next(e)
  }
})

router.get('/:date', async (req, res, next) => {
  // date format: YYYY-MM-DD
  try {
    var { date } = req.params
    var orders = await getOrderByDate(date)
    const total = orders.reduce((acc, cur) => {
      const { itemList } = cur
      const _total = itemList.reduce((acc1, cur1) => {
        return acc1 + cur1.menuProperty.price * cur1.amount
      }, 0)
      return acc + _total
    }, 0)
    if (orders instanceof Error) {
      logger.info(orders)
      orders = null
    }
    return res.send({ orders: orders ? orders : [], totalSales: total })
  } catch (e) {
    return next(e)
  }
})

router.post('/', jwtVerify, upload.array(), async (req, res, next) => {
  try {
    const response = await createOrder(req.body)
    return res.send(response)
  } catch (error) {
    logger.error(error.message)
    return next(error)
  }

})

router.post('/revert/:id', jwtVerify, async (req, res, next) => {
  var { id } = req.params
  var out = await revertOrder(id)
  if (out instanceof Error) {
    return next(out)
  } else {
    return res.send({ message: `Order id:${id} has been reverted`, id })
  }
})


router.put('/:id', jwtVerify, async (req, res, next) => {
  const { id } = req.params
  try {
    const out = await updateOrder(id, req.body)
    return res.send(out)
  } catch (e) {
    return next(e)
  }
})

router.delete('/:id', jwtVerify, async (req, res, next) => {
  const _id = req.params.id
  try {
    const response = await deleteOrder(_id)
    return res.send(response)
  } catch (e) {
    return next(e)
  }
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
