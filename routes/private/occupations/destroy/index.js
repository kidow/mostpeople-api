const router = require('express').Router()

router.delete('/:id', require('./_id'))

module.exports = router
