const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const {
  COOKIE_SECRET,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = process.env

module.exports = session({
  resave: false,
  saveUninitialized: true,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production'
  },
  store: new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    pass: REDIS_PASSWORD,
    logErrors: true
  })
})
