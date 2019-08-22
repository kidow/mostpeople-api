const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.post('/', isLoggedIn, require('./_'))

module.exports = router
