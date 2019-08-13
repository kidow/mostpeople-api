const Joi = require('@hapi/joi')

module.exports = (body, schema, res) => {
  const { error } = Joi.validate(body, schema)
  if (error) return res.sendStatus(400)
}
