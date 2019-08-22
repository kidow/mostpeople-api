const Joi = require('@hapi/joi')

module.exports = (reqBody, schema, res, next) => {
  const { error } = Joi.validate(reqBody, schema)
  if (error)
    return process.env.NODE_ENV === 'production'
      ? res.sendStatus(412)
      : next(error)
}
