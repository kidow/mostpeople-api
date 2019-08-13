const { ...update } = require('./update')
const { ...find } = require('./find')

module.exports = {
  ...update,
  ...find
}
