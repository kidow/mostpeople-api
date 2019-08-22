const Profession = require('@models/professions')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prv/professions/:id
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  try {
    await Profession.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
