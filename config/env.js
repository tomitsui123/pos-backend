const requiredByEnvironment = {
  production: [
    'MONGODB_ROOT_USERNAME',
    'MONGODB_ROOT_PASSWORD',
    'MONGODB_HOST',
    'MONGODB_PORT',
    'MONGODB_DB',
    'JWT_SECRET',
    'CONTROL_PANEL_PASSWORD',
    'API_DEVICE_TOKEN',
    'CORS_ORIGIN',
    'PORT',
    'TZ',
  ],
  development: [
    'MONGODB_ROOT_USERNAME',
    'MONGODB_ROOT_PASSWORD',
    'MONGODB_HOST',
    'MONGODB_PORT',
    'MONGODB_DB',
    'JWT_SECRET',
    'CONTROL_PANEL_PASSWORD',
    'API_DEVICE_TOKEN',
    'CORS_ORIGIN',
    'PORT',
    'TZ',
  ],
}

function validateEnv(env = process.env) {
  if (env === process.env && process.env.NODE_ENV === 'test') return

  const environment = env.NODE_ENV === 'production' ? 'production' : 'development'
  const missing = requiredByEnvironment[environment].filter(key => !env[key])

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

module.exports = {
  validateEnv,
}
