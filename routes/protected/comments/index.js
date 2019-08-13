const router = require('express').Router()

router.use(require('./create'))
router.use(require('./destroy'))
router.use(require('./update'))

module.exports = router
