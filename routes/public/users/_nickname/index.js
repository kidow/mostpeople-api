const router = require('express').Router()

router.get('/', require('./_'))
router.get('/timeline', require('./timeline'))

module.exports = router
