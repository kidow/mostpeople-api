const router = require('express').Router()
const { isAdmin } = require('@middle')

router.delete('/:id', isAdmin, require('./_id'))

module.exports = router
