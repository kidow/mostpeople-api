const User = require('@models/users')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prt/users/image
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    imageId: Joi.number().required()
  })
  validate(req.body, schema, res, next)

  const { imageId } = req.body

  try {
    await User.protected.update([{ imageId }, { id: req.user.id }])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
