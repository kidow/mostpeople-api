const User = require('@models/users')
const Joi = require('@hapi/joi')
const sendgrid = require('@lib/sendgrid')

// POST /auth/email
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(412)

  const { email } = req.body
  const { type } = req.query

  try {
    const user = await User.findByEmail(email)
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
