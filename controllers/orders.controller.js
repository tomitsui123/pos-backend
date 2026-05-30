const moment = require('moment')
const Orders = require('../models/orders.model')
const httpError = require('../utils/httpError')

const writableFields = [
  'clientOrderId',
  'itemList',
  'totalAmount',
  'total',
  'telephone',
  'priority',
  'paid',
  'remarks',
  'deleted',
  'deletedAt',
  'createdAt',
  'updatedAt',
  'orderNumber',
  'isTakeAway',
  'isDomesticHelper',
  'aluminiumPaper',
  'ownBox',
  'withoutTableware',
  'sitLocation',
  'prevOrder',
]

function normalizeOrderPayload(input) {
  if (!input || !Array.isArray(input.itemList)) {
    throw httpError(400, 'itemList is required')
  }

  const invalidKey = Object.keys(input).find(key => !writableFields.includes(key))
  if (invalidKey) {
    throw httpError(400, `The key (${invalidKey}) is not allowed`)
  }

  return {
    ...input,
    telephone: input.telephone == null ? '' : String(input.telephone),
    totalAmount: input.totalAmount != null ? input.totalAmount : input.total,
    itemList: input.itemList.map(item => ({
      ...item,
      price: item.price != null ? item.price : item.menuProperty && item.menuProperty.price,
    })),
  }
}

function toSyncResponse(order, message) {
  return {
    message,
    id: order._id.toString(),
    clientOrderId: order.clientOrderId || '',
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    syncVersion: order.syncVersion || 1,
  }
}

module.exports.getOrder = async () => {
  const orders = await Orders.find()
  return orders
}

module.exports.getOrderById = async (id) => {
  const orders = await Orders.findById(id)
  return orders
}

module.exports.getOrderByDate = async (date) => {
  if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
    throw httpError(400, 'The date format is not correct')
  }
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
  const payload = normalizeOrderPayload(input)
  const now = moment().toDate()
  const query = payload.clientOrderId ? { clientOrderId: payload.clientOrderId } : { _id: undefined }
  const savedOrder = await Orders.findOneAndUpdate(
    query,
    {
      ...payload,
      updatedAt: now,
      $setOnInsert: { createdAt: payload.createdAt || now },
      syncVersion: (input.syncVersion || 0) + 1,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
  return toSyncResponse(savedOrder, 'order created')
}

module.exports.updateOrder = async (id, updatedContent) => {
  const payload = normalizeOrderPayload(updatedContent)
  const savedOrder = await Orders.findByIdAndUpdate(
    id,
    {
      ...payload,
      updatedAt: moment().toDate(),
      $inc: { syncVersion: 1 },
    },
    { new: true }
  )
  if (!savedOrder) {
    throw httpError(404, `The order(id:${id}) cannot be changed`)
  }
  return toSyncResponse(savedOrder, 'order updated')
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
    throw httpError(404, `id ${_id} cannot be found.`)
  }
  if (!checking) {
    throw httpError(404, `id ${_id} has been deleted.`)
  }
  return { message: `deleted order(id: ${_id}).`, id: _id }
}

module.exports.normalizeOrderPayload = normalizeOrderPayload
