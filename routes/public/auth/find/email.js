const client = require('redis').createClient()

// GET /auth/email
module.exports = (_, res, next) => {
  try {
    client.get('email', (err, email) => {
      if (err) next(err)
      res.json({ email })
    })
  } catch (err) {
    next(err)
  }
}
