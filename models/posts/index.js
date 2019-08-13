const public = require('./public')
const protected = require('./protected')
const private = require('./private')

module.exports = {
  ...public,
  protected,
  private
}
