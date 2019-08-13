const router = require('express').Router()

router.use(require('./find'))
router.use(require('./update'))

module.exports = router
