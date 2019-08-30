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
    occupationId: Joi.string().allow(''),
    emailVerified: Joi.boolean().required()
  })
  validate(req.body, schema, res, next)

  const { email, nickname, occupationId, emailVerified } = req.body

  try {
    const { providerId } = await decodeToken(req.cookies.profile_token)
    const user = await User.findProfile({ providerId })

    delete user.password

    if (user.provider === 'kakao' && !emailVerified) {
      const isEmailExisted = await User.findProfile({ email })
      if (isEmailExisted.id)
        return res.status(400).json({ message: '이미 존재하는 이메일입니다.' })
    }

    if (user.nickname)
      return res.status(403).json({ message: '이미 가입되어 있습니다.' })

    const isNicknameExisted = await User.findByNickname(nickname)
    if (isNicknameExisted)
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' })

    let payload = {
      nickname,
      occupationId
    }
    if (!emailVerified) payload.email = email
    await User.update([payload, { providerId }])

    const token = await encodeToken(Object.assign({}, user))
    req.login(user, err => {
      if (err) return next(err)
      req.session.profile = {}
      const options = {
        path: '/',
        domain:
          process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost'
      }
      res.cookie('access_token', token, cookieOptions)
      res.clearCookie('profile_token', options)
      res.clearCookie('redirect', options)
      res.status(200)
      res.json(true)
    })
  } catch (err) {
    next(err)
  }
}
