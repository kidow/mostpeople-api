const session = require('express-session')
const client = require('redis').createClient()
const RedisStore = require('connect-redis')(session)
const { COOKIE_SECRET, NODE_ENV, REDIS_HOST, REDIS_PORT } = process.env

module.exports = session({
  resave: false,
  saveUninitialized: true,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    client,
    logErrors: true
  })
})
