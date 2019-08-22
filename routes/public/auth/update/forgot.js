const User = require('@models/users')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /auth/forgot
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  })
  validate(req.body, schema, res, next)

  const { email, password } = req.body

  try {
    const newPassword = await bcrypt.hashSync(password, 12)
    await User.protected.setOneByEmail([{ password: newPassword }, email])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
