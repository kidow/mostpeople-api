const Introduction = require('@models/introductions')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prt/introductions/:occupationId
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    intro: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  const { intro } = req.body
  const { occupationId } = req.params

  try {
    await Introduction.protected.create({
      content: intro,
      userId: req.user.uuid,
      occupationId
    })
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
