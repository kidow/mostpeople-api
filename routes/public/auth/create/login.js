const Joi = require('@hapi/joi')
const { encodeToken } = require('@lib/jwt')
const recaptcha = require('@lib/recaptcha')
const passport = require('passport')
const validate = require('@lib/validate')

// POST /auth/login
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string().required()
    // token: Joi.string().required()
  })
  validate(req.body, schema, res, next)

  // const { success } = await recaptcha(req.body.token, req.ip)
  // if (!success) return res.sendStatus(405)

  passport.authenticate('login', async (err, user, info) => {
    if (err) return next(err)
    if (info && info.message) return res.status(info.status).json(info)
    try {
      const token = await encodeToken(Object.assign({}, user))
      const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain:
          process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost'
      }
      req.login(user, err => {
        if (err) return next(err)
        res
          .status(200)
          .cookie('access_token', token, options)
          .json(true)
      })
    } catch (err) {
      next(err)
    }
  })(req, res, next)
}
