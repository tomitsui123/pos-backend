const requiredByEnvironment = {
  production: [
    'MONGODB_ROOT_USERNAME',
    'MONGODB_ROOT_PASSWORD',
    'MONGODB_PORT',
    'JWT_SECRET',
    'CONTROL_PANEL_PASSWORD',
    'TZ',
  ],
  development: [
    'MONGODB_HOST',
    'MONGODB_PORT',
    'JWT_SECRET',
    'CONTROL_PANEL_PASSWORD',
    'TZ',
  ],
}

function validateEnv() {
  if (process.env.NODE_ENV === 'test') return

  const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development'
  const missing = requiredByEnvironment[environment].filter(key => !process.env[key])

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

module.exports = {
  validateEnv,
}
