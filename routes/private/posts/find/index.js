const router = require('express').Router()
const { isAdmin } = require('@middle')

router.get('/', isAdmin, require('./_'))
router.get('/:id', isAdmin, require('./_id'))

module.exports = router
