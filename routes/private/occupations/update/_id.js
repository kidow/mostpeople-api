const Occupation = require('@models/occupations')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prv/occupations/:id
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    parentId: Joi.number()
      .allow(null)
      .allow(''),
    korName: Joi.string().required(),
    engName: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  try {
    await Occupation.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
