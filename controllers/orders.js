const moment = require('moment')
const Orders = require('../models/orders')
const Log = require('../models/log')
const mongoose = require('mongoose')
const _ = require('lodash')

module.exports.getOrder = async () => {
  console.log('getOrder')
  const orders = await Orders.find()
  return  orders
}

module.exports.getOrderById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return Error('The id is invalid')
  const orders = await Orders.findById(id)
  return  orders
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
  return  orders
}

const logCreator = async (action, changedItems = {}) => {
  if (!['create', 'edit', 'delete'].includes(action)) return Error('Log action is not correct')
  try {
    const log = Log({datetime: moment(), action, changedItems})
    await log.save()
  } catch(e) {
    console.log(e)
  }
  console.log('success')
  return { loggedTime: moment(), changedItems, action }
}

module.exports.createOrder = async input => {
  console.log('createOrder')
  console.log(input)
  const checkItemList = input => {
    if (!input.itemList) return input
    for (let i = 0; i < input.itemList.length; i++) {
      if (!_.isEqual(Object.keys(input.itemList[i]).sort(), ['item', 'price', 'amount'].sort())) {
        return Error('The item list parameters are not correct')
      }
    }
    return input
  }
  try {
    // input = checkItemList(input)
    if (input instanceof Error) {
      return input
    }
    const order = await Orders({ ...input })
    logCreator('create', input)
    const savedOrder = await order.save()
    return savedOrder._id
  } catch(e) {
    console.log(e)
    return Error(e)
  }
}

module.exports.updateOrder  = async (id, updatedContent) => {
  const checkUpdatedContent = checkedContent => {
    console.log(checkedContent, '<====== gotcha')
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
    logCreator('edit', updatedContent)
  } catch(e) {
    return Error(e)
  }
  return {
    message: `Order has been changed`,
    id,
    changedItem: updatedContent
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