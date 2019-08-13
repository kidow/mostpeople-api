const { ...create } = require('./create')
const { ...find } = require('./find')
const { ...destroy } = require('./destroy')

module.exports = { ...create, ...find, ...destroy }
