const { ...update } = require('./update')
const { ...find } = require('./find')

module.exports = {
  ...find,
  ...update
}
