const User = require('@models/users')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')
const { encodeToken, decodeToken } = require('@lib/jwt')
const cookieOptions = require('@utils/cookieOptions')

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

  const { nickname, occupationId } = req.body

  try {
    const { email } = await decodeToken(req.cookies.profile_token)
    const user = await User.findByEmail(email)

    delete user.password

    if (!user.email)
      return res.status(404).json({
        message: '존재하지 않는 계정입니다.'
      })

    if (user.nickname)
      return res.status(403).json({ message: '이미 가입되어 있습니다.' })

    const isNicknameExisted = await User.findByNickname(nickname)
    if (isNicknameExisted)
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' })

    await User.update([req.body, email])

    user.nickname = nickname
    user.occupationId = occupationId

    const token = await encodeToken(Object.assign({}, user))
    req.login(user, err => {
      if (err) return next(err)
      req.session.profile = {}
      res.cookie('access_token', token, cookieOptions(1))
      res.clearCookie('profile_token', cookieOptions())
      res.clearCookie('redirect', cookieOptions())
      res.status(200)
      res.json(true)
    })
  } catch (err) {
    next(err)
  }
}
