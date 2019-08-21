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
router.get('/kakao', passport.authenticate('kakao'))
router.get(
  '/naver',
  passport.authenticate('naver', {
    scope: ['email']
  })
)
router.get('/me', require('./me'))

router.use('/callback', require('./callback'))

module.exports = router
