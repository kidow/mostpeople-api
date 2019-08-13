const { ...create } = require('./create')
const { ...find } = require('./find')
const { ...update } = require('./update')
const { ...destroy } = require('./destroy')

module.exports = {
  ...create,
  ...find,
  ...update,
  ...destroy
}
