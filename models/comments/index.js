const private = require('./private')
const public = require('./public')
const protected = require('./protected')

module.exports = {
  private,
  ...public,
  protected
}
