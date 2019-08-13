const router = require('express').Router()

router.get('/', require('./_'))
router.get('/search', require('./search'))

router.use('/auth', require('./auth'))
router.use('/posts', require('./posts'))
router.use('/users', require('./users'))
router.use('/occupations', require('./occupations'))

module.exports = router
