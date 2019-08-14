const router = require('express').Router()

router.get('/sitemaps', require('./sitemaps'))

module.exports = router
