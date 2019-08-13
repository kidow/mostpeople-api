const { ...update } = require('./update')
const { ...find } = require('./find')
const { ...destroy } = require('./destroy')

module.exports = {
  ...find,
  ...update,
  ...destroy
}
