const passport = require('passport')
const socialCallback = require('@utils/socialCallback')

// GET /auth/callback/naver
module.exports = (req, res, next) => {
  passport.authenticate('naver', { scope: ['email'] }, (err, user, info) =>
    socialCallback(req, res, next, err, user, info)
  )(req, res, next)
}
