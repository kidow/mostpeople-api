const router = require('express').Router()

router.get('/:nickname', require('./_nickname/_'))
router.get('/:nickname/timeline', require('./_nickname/timeline'))

module.exports = router
