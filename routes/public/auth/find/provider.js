const passport = require('passport')

// GET /auth/:provider(facebook|google|naver|kakao)
module.exports = (req, res, next) => {
  const { redirect } = req.query
  const { provider } = req.params
  if (redirect) req.session.redirect = redirect
  let options
  if (provider !== 'kakao') options = { scope: ['email'] }
  passport.authenticate(provider, options)(req, res, next)
}
