const passport = require('passport')
const cookieOptions = require('@utils/cookieOptions')

// GET /auth/:provider(facebook|google|naver|kakao)
module.exports = (req, res, next) => {
  const { redirect } = req.query
  const { provider } = req.params
  let options
  if (provider !== 'kakao') options = { scope: ['email'] }
  res.cookie('redirect', redirect, cookieOptions)
  passport.authenticate(provider, options)(req, res, next)
}
