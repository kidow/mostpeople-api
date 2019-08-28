const router = require('express').Router()

router.get('/me', require('./me'))
router.get('/email', require('./email'))
router.get('/:provider(facebook|google|kakao|naver)', require('./provider'))

router.use('/callback', require('./callback'))

module.exports = router
