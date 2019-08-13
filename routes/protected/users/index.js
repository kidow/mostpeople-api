const router = require('express').Router()

router.use(require('./update'))
router.use(require('./destroy'))
router.use(require('./find'))

module.exports = router
