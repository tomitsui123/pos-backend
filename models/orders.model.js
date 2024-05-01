const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const moment = require('moment')


const OptionProperty = new mongoose.Schema({
  title: String,
  type: String,
  option: [String]
})

const MenuProperty = new mongoose.Schema({
  id: String,
  category: String,
  options: [OptionProperty],
  itemCode: String,
  displayName: String,
  price: Number,
  imgSrcUrl: String
})

const itemSchema = new mongoose.Schema({
  item: String,
  itemNumber: String,
  menuProperty: MenuProperty,
  amount: Number,
  price: Number,
  remarkList: [{
    content: String,
    title: String
  }],
  isTakeAway: Boolean
})

const orderSchema = new mongoose.Schema({
  itemList: { type: [itemSchema], required: true },
  totalAmount: Number,
  telephone: { type: Number, default: null },
  priority: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
  remarks: Array,
  isTakeAway: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: moment() },
  updatedAt: { type: Date, default: moment() },
  orderNumber: { type: Number, unique: true },
  isTakeAway: Boolean
})

const momentFormat = schema => {
  schema.post(['find', 'findOne'], docs => {
    if (!docs) return
    if (!Array.isArray(docs)) {
      docs = [docs]
    }
    for (let doc of docs) {
      doc.createdAt = moment(doc.createdAt).format('YYYY-MM-DD HH:mm:ss')
      doc.updatedAt = moment(doc.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  })
}

orderSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true })
orderSchema.plugin(momentFormat)

module.exports = mongoose.model('orders', orderSchema)