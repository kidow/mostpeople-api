const router = require('express').Router()

router.get('/search', require('./search'))
router.get('/:occupationId', require('./_occupationId'))

module.exports = router
