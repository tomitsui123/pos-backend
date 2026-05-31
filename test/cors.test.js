const { buildCorsOptions } = require('../config/cors')

describe('CORS configuration', () => {
  test('allows wildcard only when explicitly configured', () => {
    expect(buildCorsOptions({ CORS_ORIGIN: '*' })).toEqual({
      origin: '*',
    })
  })

  test('trims comma-separated allowlist origins', () => {
    expect(buildCorsOptions({
      CORS_ORIGIN: 'https://admin.example.com, https://pos.example.com',
    })).toEqual({
      origin: ['https://admin.example.com', 'https://pos.example.com'],
    })
  })

  test('disables CORS when no origin is configured', () => {
    expect(buildCorsOptions({})).toEqual({
      origin: false,
    })
  })
})
