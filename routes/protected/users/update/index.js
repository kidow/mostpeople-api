const router = require('express').Router()

router.put('/', require('./_'))
router.put('/password', require('./password'))
router.put('/image', require('./image'))

module.exports = router
