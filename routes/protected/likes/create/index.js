const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.post('/:refId', isLoggedIn, require('./_refId'))

module.exports = router
