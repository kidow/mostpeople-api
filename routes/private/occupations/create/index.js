const router = require('express').Router()
const { isAdmin } = require('@middle')

router.post('/', isAdmin, require('./_'))

module.exports = router
