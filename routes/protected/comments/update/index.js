const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.put('/:commentId', isLoggedIn, require('./_commentId'))

module.exports = router
