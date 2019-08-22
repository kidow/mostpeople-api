const passport = require('passport')
const socialCallback = require('@utils/socialCallback')

// GET /auth/callback/facebook
module.exports = (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) =>
    socialCallback(req, res, next, err, user, info)
  )(req, res, next)
}
