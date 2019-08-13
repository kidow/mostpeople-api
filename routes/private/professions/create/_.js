const Profession = require('@models/professions')
const Joi = require('@hapi/joi')

// POST /prv/professions
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  const schema = Joi.object().keys({
    name: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)
  try {
    await Profession.private.create(req.body)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
