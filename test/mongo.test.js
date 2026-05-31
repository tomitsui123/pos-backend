const {
  buildMongoUri,
  buildMongoOptions,
} = require('../config/mongo')

describe('Mongo configuration', () => {
  const env = {
    MONGODB_HOST: 'shop-mongo',
    MONGODB_PORT: '27017',
    MONGODB_DB: 'pos',
    MONGODB_ROOT_USERNAME: 'root',
    MONGODB_ROOT_PASSWORD: 'password',
  }

  test('buildMongoUri uses explicit host, port, and database', () => {
    expect(buildMongoUri(env)).toBe('mongodb://shop-mongo:27017/pos')
  })

  test('buildMongoOptions sets auth and resilient pool options', () => {
    expect(buildMongoOptions(env)).toEqual({
      authSource: 'admin',
      user: 'root',
      pass: 'password',
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 20,
      minPoolSize: 2,
    })
  })
})
