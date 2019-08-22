const router = require('express').Router()

// router.all('*', (req, res, next) => {
//   if (!req.user) return res.status(401).json({ message: '로그인을 해주세요' })
//   if (req.user.status !== 2)
//     return res.status(401).json({ message: '관리자 권한이 없습니다' })
//   next()
// })

router.use('/occupations', require('./occupations'))
router.use('/reports', require('./reports'))
router.use('/improvements', require('./improvements'))
router.use('/professions', require('./professions'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/comments', require('./comments'))

module.exports = router
