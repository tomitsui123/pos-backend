const request = require('supertest')
const jwt = require('jsonwebtoken')

jest.mock('mongoose', () => {
  const actual = jest.requireActual('mongoose')
  return {
    ...actual,
    connect: jest.fn().mockResolvedValue({}),
  }
})

jest.mock('../models/recipes.model', () => ({
  find: jest.fn(() => ({
    populate: jest.fn(() => ({
      populate: jest.fn().mockResolvedValue([]),
    })),
  })),
}))

jest.mock('../models/optionGroup.model', () => ({
  find: jest.fn().mockResolvedValue([]),
}))

jest.mock('../models/orders.model', () => ({
  find: jest.fn().mockResolvedValue([]),
  findOneAndUpdate: jest.fn().mockResolvedValue({
    _id: 'server-1',
    clientOrderId: 'client-1',
    orderNumber: 1,
    createdAt: new Date('2026-05-30T10:00:00Z'),
    updatedAt: new Date('2026-05-30T10:00:00Z'),
    syncVersion: 1,
  }),
  findByIdAndUpdate: jest.fn().mockResolvedValue({
    _id: 'server-1',
    clientOrderId: 'client-1',
    orderNumber: 1,
    createdAt: new Date('2026-05-30T10:00:00Z'),
    updatedAt: new Date('2026-05-30T10:00:00Z'),
    syncVersion: 2,
  }),
}))

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-secret'
process.env.API_DEVICE_TOKEN = 'device-token'
process.env.CONTROL_PANEL_PASSWORD = 'password'
process.env.MONGODB_HOST = 'localhost'
process.env.MONGODB_PORT = '27017'
process.env.MONGODB_ROOT_USERNAME = 'root'
process.env.MONGODB_ROOT_PASSWORD = 'password'
process.env.TZ = 'UTC'

const app = require('../app')

describe('API contract', () => {
  test('GET /api/health returns service metadata', async () => {
    const response = await request(app).get('/api/health').expect(200)

    expect(response.body).toEqual(expect.objectContaining({
      status: 'ok',
      environment: 'test',
    }))
  })

  test('GET /api/recipe is readable without auth', async () => {
    const response = await request(app).get('/api/recipe').expect(200)

    expect(response.body).toEqual({ recipe: [], options: [] })
  })

  test('POST /api/recipe rejects invalid payloads', async () => {
    const response = await request(app)
      .post('/api/recipe')
      .set('Authorization', 'Bearer device-token')
      .send({ itemCode: 'A1', displayName: '', price: -1, category: 'Rice' })
      .expect(400)

    expect(response.body.message).toBe('displayName is required')
  })

  test('POST /api/order rejects missing auth', async () => {
    const response = await request(app)
      .post('/api/order')
      .send({ clientOrderId: 'client-1', itemList: [] })
      .expect(401)

    expect(response.body.message).toBe('Unauthorized')
  })

  test('POST /api/order accepts device bearer token and returns sync response', async () => {
    const response = await request(app)
      .post('/api/order')
      .set('Authorization', 'Bearer device-token')
      .send({ clientOrderId: 'client-1', itemList: [{ menuProperty: { price: 1 }, amount: 1 }] })
      .expect(200)

    expect(response.body).toEqual(expect.objectContaining({
      id: 'server-1',
      clientOrderId: 'client-1',
      syncVersion: 1,
      message: 'order created',
    }))
  })

  test('PUT /api/order/:id accepts JWT bearer token', async () => {
    const token = jwt.sign({ sign: 'sign' }, process.env.JWT_SECRET)

    const response = await request(app)
      .put('/api/order/server-1')
      .set('Authorization', `Bearer ${token}`)
      .send({ clientOrderId: 'client-1', itemList: [{ menuProperty: { price: 1 }, amount: 1 }] })
      .expect(200)

    expect(response.body).toEqual(expect.objectContaining({
      id: 'server-1',
      clientOrderId: 'client-1',
      syncVersion: 2,
      message: 'order updated',
    }))
  })
})
