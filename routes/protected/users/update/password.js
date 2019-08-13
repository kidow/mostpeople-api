const User = require('@models/users')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')

// PUT /prt/users/password
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    password: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(405)

  const { password } = req.body

  try {
    const user = await User.protected.findById(req.user.id)
    const validate = await bcrypt.compareSync(password, user.password)
    if (!validate)
      return res.status(400).json({ message: '비밀번호가 맞지 않습니다.' })
    const newPassword = await bcrypt.hashSync(password, 12)
    await User.protected.update([
      { password: newPassword },
      { email: req.user.email }
    ])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
