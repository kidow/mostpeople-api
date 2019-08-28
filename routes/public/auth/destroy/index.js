const router = require('express').Router()
const { isLoggedIn } = require('@middle')

router.delete('/logout', isLoggedIn, require('./logout'))

module.exports = router
