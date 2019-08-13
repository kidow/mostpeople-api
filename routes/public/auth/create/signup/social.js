const User = require('@models/users')
const Joi = require('@hapi/joi')

// POST /auth/signup/social
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    nickname: Joi.string()
      .min(3)
      .max(8)
      .required(),
    occupationId: Joi.string().allow('')
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(405)

  const { email, nickname, occupationId } = req.body

  try {
    const user = await User.findByEmail(email)
    if (!user.email)
      return res.status(404).json({
        message: '존재하지 않는 소셜 이메일입니다. 관리자로 문의해주세요.'
      })
    if (user.nickname)
      return res
        .status(403)
        .json({ message: '이미 가입되어 있습니다. 관리자에게 문의해주세요.' })
    const isNicknameExisted = await User.findByNickname(nickname)
    if (isNicknameExisted)
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' })
    await User.update([{ nickname, occupationId }, email])
    req.login(user, err => {
      if (err) return next(err)
      res.status(200).json(true)
    })
  } catch (err) {
    next(err)
  }
}
