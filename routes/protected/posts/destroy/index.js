const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.delete('/:postId', isLoggedIn, require('./_postId'))

module.exports = router
