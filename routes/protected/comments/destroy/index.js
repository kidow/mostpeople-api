const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.delete('/:commentId', isLoggedIn, require('./_commentId'))

module.exports = router
