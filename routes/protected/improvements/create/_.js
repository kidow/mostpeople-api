const Improvement = require('@models/improvements')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// POST /prv/improvements
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    content: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  try {
    await Improvement.protected.create(req.body)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
