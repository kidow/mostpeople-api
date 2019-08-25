const User = require('@models/users')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')
const { encodeToken } = require('@lib/jwt')
const cookieOptions = require('@utils/cookieOptions')

// POST /auth/signup/social
module.exports = async (req, res, next) => {
  console.log(req.body)
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
    const user = await User.findProfile({ email })
    if (user.email && emailVerified)
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' })
    else if (!user.email)
      return res.status(404).json({
        message: '존재하지 않는 계정입니다.'
      })

    if (user.nickname)
      return res.status(403).json({ message: '이미 가입되어 있습니다.' })

    const isNicknameExisted = await User.findByNickname(nickname)
    if (isNicknameExisted)
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' })

    let payload = {
      nickname,
      occupationId
    }
    if (emailVerified) payload.email = email
    await User.update([payload, { email }])

    const token = await encodeToken(Object.assign({}, user))
    req.login(user, err => {
      if (err) return next(err)
      req.session.profile = {}
      res
        .status(200)
        .cookie('access_token', token, cookieOptions)
        .json(true)
    })
  } catch (err) {
    next(err)
  }
}
