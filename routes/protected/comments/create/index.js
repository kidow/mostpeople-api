const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.post('/:postId', isLoggedIn, require('./_postId'))

module.exports = router
