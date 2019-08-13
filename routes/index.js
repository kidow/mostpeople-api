const router = require('express').Router()

router.use('/', require('./public'))
router.use('/prv', require('./private'))
router.use('/prt', require('./protected'))

router.all('/health', (_, res) => res.sendStatus(200))

module.exports = router
