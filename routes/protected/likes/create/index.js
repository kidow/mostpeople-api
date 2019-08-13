const router = require('express').Router()

router.post('/:refId', require('./_refId'))

module.exports = router
