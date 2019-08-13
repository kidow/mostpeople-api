const router = require('express').Router()

router.get('/timeline', require('./timeline'))

module.exports = router
