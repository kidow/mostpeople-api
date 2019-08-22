const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.delete('/', isLoggedIn, require('./_'))

module.exports = router
