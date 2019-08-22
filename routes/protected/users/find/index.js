const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.get('/timeline', isLoggedIn, require('./timeline'))

module.exports = router
