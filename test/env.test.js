const { validateEnv } = require('../config/env')

const requiredBaseEnv = {
  MONGODB_ROOT_USERNAME: 'root',
  MONGODB_ROOT_PASSWORD: 'password',
  MONGODB_HOST: 'localhost',
  MONGODB_PORT: '27017',
  MONGODB_DB: 'pos',
  JWT_SECRET: 'secret',
  CONTROL_PANEL_PASSWORD: 'password',
  API_DEVICE_TOKEN: 'device-token',
  CORS_ORIGIN: 'https://pos.example.com',
  PORT: '8080',
  TZ: 'UTC',
}

describe('environment validation', () => {
  test('production requires the full security and database configuration', () => {
    expect(() => validateEnv({
      NODE_ENV: 'production',
      ...requiredBaseEnv,
      API_DEVICE_TOKEN: '',
    })).toThrow('Missing required environment variables: API_DEVICE_TOKEN')
  })

  test('development requires an explicit port instead of implicit HTTP defaults', () => {
    expect(() => validateEnv({
      NODE_ENV: 'development',
      ...requiredBaseEnv,
      PORT: '',
    })).toThrow('Missing required environment variables: PORT')
  })

  test('test environment can opt into validation by passing an explicit environment object', () => {
    expect(() => validateEnv({
      NODE_ENV: 'test',
      ...requiredBaseEnv,
    })).not.toThrow()
  })
})
