const router = require('express').Router()

router.get('/', require('./_'))
router.get('/:id', require('./_id'))

module.exports = router
