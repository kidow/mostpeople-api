const router = require('express').Router()

router.get('/facebook', require('./facebook'))
router.get('/google', require('./google'))

module.exports = router
