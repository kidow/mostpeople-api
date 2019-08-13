const Joi = require('@hapi/joi')
const jwt = require('@lib/jwt')
const passport = require('passport')
const User = require('@models/users')

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
      .min(4)
      .max(8)
      .required(),
    occupationId: Joi.string().allow('')
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(412)

  passport.authenticate('signup', async (err, user, info) => {
    if (err) return next(err)
    if (info && info.message) return res.status(info.status).json(info)
    const payload = await User.findById(user.id)
    try {
      const token = await jwt.encodeToken(Object.assign({}, payload))
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

  // const { email, password, nickname } = req.body
  // try {
  // const existed = await User.findOneByEmail(email)
  // if (!existed.uuid)
  //   return res.status(409).json({ message: '이미 존재하는 계정입니다' })
  // const passwordSalt = await bcrypt.hashSync(password, 12)
  // const UUID = uuid()
  // const data = {
  //   email,
  //   password: passwordSalt,
  //   uuid: UUID,
  //   nickname
  // }
  // const { insertId } = await User.add(data)
  // const payload = {
  //   id: UUID,
  //   email,
  //   nickname
  // }
  // const token = await jwt.encodeToken(payload)
  // const options = {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  //   domain:
  //     process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost'
  // }
  // res
  //   .status(200)
  //   .cookie('access_token', token, options)
  //   .json(true)
  // } catch (err) {
  //   next(err)
  // }
}
