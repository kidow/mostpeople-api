const router = require('express').Router()

router.post('/', require('./_'))
router.post('/social', require('./social'))

module.exports = router
