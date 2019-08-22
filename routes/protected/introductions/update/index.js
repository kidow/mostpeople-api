const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.put('/:occupationId', isLoggedIn, require('./_occupationId'))

module.exports = router
