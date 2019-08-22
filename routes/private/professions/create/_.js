const Profession = require('@models/professions')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// POST /prv/professions
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  try {
    await Profession.private.create(req.body)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
