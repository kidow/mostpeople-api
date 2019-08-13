const router = require('express').Router()

router.use(require('./create'))
router.use(require('./find'))
router.use(require('./update'))
router.use(require('./destroy'))

module.exports = router
