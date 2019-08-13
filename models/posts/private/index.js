const { ...update } = require('./update')
const { ...destroy } = require('./destroy')
const { ...find } = require('./find')

module.exports = {
  ...find,
  ...update,
  ...destroy
}
