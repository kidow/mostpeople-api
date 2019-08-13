const router = require('express').Router()

router.post('/email', require('./email'))
router.post('/login', require('./login'))

router.use('/signup', require('./signup'))

module.exports = router
