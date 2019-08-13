const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@models': __dirname + '/../../models',
  '@mysql': __dirname + '/../../models/connection',
  '@middle': __dirname + '/../../lib/middlewares',
  '@lib': __dirname + '/../../lib',
  '@utils': __dirname + '/../../utils'
})
