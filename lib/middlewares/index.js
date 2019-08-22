const error = require('./error')
const jwt = require('./jwt')
const isAdmin = require('./isAdmin')
const isLoggedIn = require('./isLoggedIn')

module.exports = {
  error,
  jwt,
  isAdmin,
  isLoggedIn
}
