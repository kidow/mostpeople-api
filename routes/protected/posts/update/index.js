const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.put('/:postId', isLoggedIn, require('./_postId'))

module.exports = router
