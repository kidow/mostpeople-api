const { ...create } = require('./create')
const { ...find } = require('./find')
const { ...update } = require('./update')

module.exports = {
  ...create,
  ...find,
  ...update
}
