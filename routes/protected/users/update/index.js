const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.put('/', isLoggedIn, require('./_'))
router.put('/password', isLoggedIn, require('./password'))
router.put('/image', isLoggedIn, require('./image'))

module.exports = router
