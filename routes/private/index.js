const router = require('express').Router()
// const { isAdmin } = require('@lib/middlewares')

// router.all('*', isAdmin) // 어드민 유저만 가능

router.use('/occupations', require('./occupations'))
router.use('/reports', require('./reports'))
router.use('/improvements', require('./improvements'))
router.use('/professions', require('./professions'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/comments', require('./comments'))

module.exports = router
