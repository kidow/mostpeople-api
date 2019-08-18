const router = require('express').Router()
const passport = require('passport')

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
    session: true
  })
)
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email'],
    session: true
  })
)
router.get(
  '/kakao',
  passport.authenticate('kakao', {
    session: true,
    successRedirect: '/success',
    failureRedirect: '/failure'
  })
)
router.get('/me', require('./me'))

router.use('/callback', require('./callback'))

module.exports = router
