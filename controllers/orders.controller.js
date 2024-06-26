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
  const startDate = moment(`${date} 23:00:00`, 'YYYY-MM-DD HH:mm:ss')
  const endDate = moment(startDate).add(9, 'hours')
  const orders = await Orders.find({
    createdAt: {
      $gte: startDate,
      $lt: endDate
    }
  })
  return orders
}

module.exports.createOrder = async input => {
  if (input instanceof Error) {
    return input
  }
  const restructureInput = {
    ...input, itemList: input.itemList.map(item => ({ ...item, price: item.menuProperty.price }))
  }
  const order = await Orders({ ...restructureInput })
  const savedOrder = await order.save()
  return savedOrder._id
}

module.exports.updateOrder = async (id, updatedContent) => {
  const checkUpdatedContent = checkedContent => {
    const keyList = Object.keys(checkedContent)
    for (let i = 0; i < keyList.length; i++) {
      if (!['itemList', 'totalAmount',
        'telephone', 'priority', 'paid',
        'remarks', 'deleted', 'deletedAt', 'createdAt', 'updatedAt'].includes(keyList[i])) {
        return keyList[i]
      }
    }
    return true
  }
  try {
    const checking = checkUpdatedContent(updatedContent)
    if (!checking) {
      return new Error(`The key (${checking}) is not found`)
    }
    const updatedInfo = await Orders.updateOne({ _id: id }, { ...updatedContent, updatedAt: moment() })
    if (!updatedInfo.n) {
      return new Error(`The order(id:${id}) cannot be changed`)
    }
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
    checking.save()
  }
  return Error(`deleted order(id: ${_id}).`)
}