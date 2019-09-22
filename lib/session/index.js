const session = require('express-session')
const client = require('redis').createClient()
const RedisStore = require('connect-redis')(session)
const { COOKIE_SECRET, NODE_ENV, REDIS_HOST, REDIS_PORT } = process.env

module.exports = session({
  resave: true, // 세션에 수정사항이 생기지 않더라도 다시 저장할지 여부
  saveUninitialized: true, // 세션에 저장할 내역이 없어도 저장할지 여부
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    client
  })
})
