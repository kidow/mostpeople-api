const Joi = require('@hapi/joi')
const { NODE_ENV } = process.env

module.exports = (reqBody, schema, res, next) => {
  const { error } = Joi.validate(reqBody, schema)
  console.log('validate')
  if (error)
    return NODE_ENV === 'production' ? res.sendStatus(412) : next(error)
}
