const passport = require('passport')
const socialCallback = require('@utils/socialCallback')

// GET /auth/callback/kakao
module.exports = (req, res, next) => {
  passport.authenticate(
    'kakao',
    {
      scope: ['email']
    },
    (err, user, info) => socialCallback(req, res, next, err, user, info)
  )(req, res, next)
}
