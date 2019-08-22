const router = require('express').Router()
const { isAdmin } = require('@middle')

router.put('/:id', isAdmin, require('./_id'))

module.exports = router
