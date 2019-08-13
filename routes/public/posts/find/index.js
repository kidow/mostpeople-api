const router = require('express').Router()

router.get('/popular', require('./popular'))
router.get('/:postId', require('./_postId'))

module.exports = router
