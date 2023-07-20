const moment = require('moment')
const Orders = require('../models/orders.model')
const mongoose = require('mongoose')
const _ = require('lodash')

module.exports.getOrder = async () => {
  const orders = await Orders.find()
  return orders
}

module.exports.getOrderById = async (id) => {
  const orders = await Orders.findById(id)
  return orders
}

module.exports.getOrderByDate = async (date) => {
  if (!moment(date).isValid()) return Error('The date format is not correct')
  date = moment(date)
  const orders = await Orders.find({
    createdAt: {
      $gte: moment(date).startOf('day'),
      $lte: moment(date).endOf('day')
    }
  })
  return orders
}

module.exports.createOrder = async (req, res, next) => {
  try {
    const order = await Orders({ ...(req.body) })
    await order.save()
    return res.send({ message: 'Order has been saved', order, id: order._id })
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      console.error(e)
      next(Error("The input is not correct"))
    } else {
      next(e)
    }
  }
}

module.exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await updateOrder(id, req.body)
    await Orders.findOneAndUpdate({ _id: id }, { ...updatedContent, updatedAt: moment() })
    return res.json({
      message: `Order has been updated`,
      data
    })
  } catch (e) {
    next(e)
  }
}

module.exports.revertOrder = async _id => {
  const output = await Orders.restore({ _id })
  if (!output.nModified) {
    return Error(`The order (id:${_id}) is not deleted`)
  }
  return _id
}

module.exports.deleteOrder = async _id => {
  const checking = await Orders.findById(_id)
  const res = await Orders.delete({ _id })
  if (!res.n) {
    return Error(`id ${_id} cannot be found.`)
  }
  if (!checking) {
    return Error(`id ${_id} has been deleted.`)
  } else {
    logCreator('create')
    checking.save()
  }
  return Error(`deleted order(id: ${_id}).`)
}