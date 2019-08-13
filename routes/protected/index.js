const router = require('express').Router()

router.use('/posts', require('./posts'))
router.use('/users', require('./users'))
router.use('/comments', require('./comments'))
router.use('/introductions', require('./introductions'))
router.use('/likes', require('./likes'))
router.use('/images', require('./images'))
router.use('/improvements', require('./improvements'))

module.exports = router
