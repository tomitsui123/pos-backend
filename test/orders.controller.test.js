const Orders = require('../models/orders.model')
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByDate,
} = require('../controllers/orders.controller')

jest.mock('../models/orders.model')

const savedOrder = {
  _id: 'server-1',
  clientOrderId: 'client-1',
  orderNumber: 12,
  createdAt: new Date('2026-05-30T10:00:00Z'),
  updatedAt: new Date('2026-05-30T10:00:00Z'),
  syncVersion: 1,
}

describe('orders controller sync contract', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('createOrder upserts by clientOrderId so retries do not create duplicates', async () => {
    Orders.findOneAndUpdate.mockResolvedValue(savedOrder)

    const response = await createOrder({
      clientOrderId: 'client-1',
      itemList: [{ menuProperty: { price: 30 }, amount: 2 }],
      orderNumber: 12,
    })

    expect(Orders.findOneAndUpdate).toHaveBeenCalledWith(
      { clientOrderId: 'client-1' },
      expect.objectContaining({
        clientOrderId: 'client-1',
        itemList: [expect.objectContaining({ price: 30 })],
        syncVersion: 1,
      }),
      expect.objectContaining({ new: true, upsert: true, setDefaultsOnInsert: true })
    )
    expect(response).toEqual(expect.objectContaining({
      id: 'server-1',
      clientOrderId: 'client-1',
      syncVersion: 1,
      message: 'order created',
    }))
  })

  test('createOrder rejects missing itemList with a validation error', async () => {
    await expect(createOrder({ clientOrderId: 'client-1' }))
      .rejects.toMatchObject({ status: 400, message: 'itemList is required' })
  })

  test('updateOrder returns the standardized response shape', async () => {
    Orders.findByIdAndUpdate.mockResolvedValue({ ...savedOrder, syncVersion: 3 })

    const response = await updateOrder('server-1', {
      clientOrderId: 'client-1',
      itemList: [{ menuProperty: { price: 40 }, amount: 1 }],
    })

    expect(response).toEqual(expect.objectContaining({
      id: 'server-1',
      clientOrderId: 'client-1',
      syncVersion: 3,
      message: 'order updated',
    }))
  })

  test('deleteOrder returns success instead of an Error object', async () => {
    Orders.findById.mockResolvedValue({ _id: 'server-1' })
    Orders.delete.mockResolvedValue({ n: 1 })

    await expect(deleteOrder('server-1')).resolves.toEqual({
      message: 'deleted order(id: server-1).',
      id: 'server-1',
    })
  })

  test('getOrderByDate rejects invalid dates with a validation error', async () => {
    await expect(getOrderByDate('not-a-date'))
      .rejects.toMatchObject({ status: 400, message: 'The date format is not correct' })
  })
})
