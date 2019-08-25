const Joi = require('@hapi/joi')
const jwt = require('@lib/jwt')
const passport = require('passport')
const User = require('@models/users')
const validate = require('@lib/validate')
const cookieOptions = require('@utils/cookieOptions')

// POST /auth/signup
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    nickname: Joi.string()
      .min(3)
      .max(10)
      .required(),
    occupationId: Joi.string().allow('')
  })
  validate(req.body, schema, res, next)

  passport.authenticate('signup', async (err, user, info) => {
    if (err) return next(err)
    if (info && info.message) return res.status(info.status).json(info)
    const profile = await User.findProfile({ id: user.id })
    try {
      const token = await jwt.encodeToken(Object.assign({}, profile))
      req.login(user, err => {
        if (err) return next(err)
        res
          .status(200)
          .cookie('access_token', token, cookieOptions)
          .json(true)
      })
    } catch (err) {
      next(err)
    }
  })(req, res, next)
}
