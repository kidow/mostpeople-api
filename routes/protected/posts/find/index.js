const router = require('express').Router()

router.get('/', require('./_'))
router.get('/:postId', require('./_postId'))

module.exports = router
