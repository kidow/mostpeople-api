const Occupation = require('@models/occupations')
const Joi = require('@hapi/joi')
const uuid = require('@lib/uuid')
const validate = require('@lib/validate')

// POST /prv/occupations
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    professionId: Joi.number()
      .allow(null)
      .allow(''),
    korName: Joi.string().required(),
    engName: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  try {
    await Occupation.private.create({ ...req.body, uuid: uuid() })
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
