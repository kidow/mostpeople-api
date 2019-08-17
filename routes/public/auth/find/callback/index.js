const router = require('express').Router()

router.get('/facebook', require('./facebook'))
router.get('/google', require('./google'))
router.get('/kakao', require('./kakao'))

module.exports = router
