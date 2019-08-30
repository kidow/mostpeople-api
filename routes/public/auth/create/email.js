const User = require('@models/users')
const Joi = require('@hapi/joi')
const sendgrid = require('@lib/sendgrid')
const validate = require('@lib/validate')

// POST /auth/email
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required()
  })
  validate(req.body, schema, res, next)

  const { email, type } = req.body

  try {
    const user = await User.findProfile({ email })
    if (type === 'forgot' && !user.password)
      return res.status(404).json({
        message: `다음과 같은 소셜 계정으로 가입한 이메일입니다. (${user.provider})`
      })
    if (type === 'verify' && user.id && user.status !== 4)
      return res.status(400).json({ message: '이미 가입된 계정입니다.' })
    if ((type === 'forgot' && !user.id) || user.status === 4)
      return res.status(404).json({ message: '가입되지 않은 회원입니다.' })
    let purpose = type === 'verify' ? '이메일 인증' : '비밀번호 초기화'
    const authCode = await sendgrid(email, purpose)
    res.status(200).json({ authCode })
  } catch (err) {
    next(err)
  }
}
