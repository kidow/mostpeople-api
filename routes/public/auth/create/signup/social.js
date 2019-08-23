const User = require('@models/users')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')
const { encodeToken } = require('@lib/jwt')

// POST /auth/signup/social
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    nickname: Joi.string()
      .min(3)
      .max(10)
      .required(),
    occupationId: Joi.string().allow('')
  })
  validate(req.body, schema, res, next)

  const { email, nickname, occupationId } = req.body

  try {
    const user = await User.findByEmail(email)
    if (!user.email)
      return res.status(404).json({
        message: '존재하지 않는 계정입니다.'
      })
    if (user.nickname)
      return res.status(403).json({ message: '이미 가입되어 있습니다.' })
    const isNicknameExisted = await User.findByNickname(nickname)
    if (isNicknameExisted)
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' })
    await User.update([{ nickname, occupationId }, email])
    const token = await encodeToken(Object.assign({}, user))
    const options = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      domain:
        process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost'
    }
    req.login(user, err => {
      if (err) return next(err)
      req.session.email = ''
      res
        .status(200)
        .cookie('access_token', token, options)
        .json(true)
    })
  } catch (err) {
    next(err)
  }
}
