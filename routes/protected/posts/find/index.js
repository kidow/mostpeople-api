const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.get('/', isLoggedIn, require('./_'))
router.get('/:postId', isLoggedIn, require('./_postId'))

module.exports = router
