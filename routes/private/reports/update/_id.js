const Report = require('@models/reports')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prv/reports/:id
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    answer: Joi.string().required(),
    status: Joi.number()
  })
  validate(req.body, schema, res, next)

  try {
    await Report.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
