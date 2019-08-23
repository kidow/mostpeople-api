const router = require('express').Router()
const passport = require('passport')

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
)
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email']
  })
)
router.get(
  '/kakao',
  passport.authenticate('kakao', {
    authType: 'rerequest'
  })
)
router.get(
  '/naver',
  passport.authenticate('naver', {
    scope: ['email']
  })
)
router.get('/me', require('./me'))
router.get('/email', (req, res) => res.json({ email: req.session.email || '' }))

router.use('/callback', require('./callback'))

module.exports = router
