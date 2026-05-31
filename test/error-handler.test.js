jest.mock('../utils/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}))

const { errorHandler } = require('../routes/index.route')

function createResponse() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
  }
}

describe('API error handler', () => {
  const originalNodeEnv = process.env.NODE_ENV

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv
  })

  test('production server errors return a safe message', () => {
    process.env.NODE_ENV = 'production'
    const response = createResponse()

    errorHandler(new Error('database password leaked in stack'), {}, response, () => {})

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ message: 'Internal server error' })
  })

  test('handled validation errors keep their message', () => {
    process.env.NODE_ENV = 'production'
    const response = createResponse()
    const error = new Error('clientOrderId is required')
    error.status = 400

    errorHandler(error, {}, response, () => {})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'clientOrderId is required' })
  })
})
