const { ...find } = require('./find')
const { ...update } = require('./update')
const { ...create } = require('./create')
const { ...destroy } = require('./destroy')

module.exports = {
  ...find,
  ...update,
  ...create,
  ...destroy
}
