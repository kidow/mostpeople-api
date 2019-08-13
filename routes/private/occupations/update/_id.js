const Occupation = require('@models/occupations')
const Joi = require('@hapi/joi')

// PUT /prv/occupations/:id
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })
  if (req.user.status !== 2)
    return res.status(401).json({ message: '관리자 권한이 아닙니다.' })

  const schema = Joi.object().keys({
    parentId: Joi.number()
      .allow(null)
      .allow(''),
    korName: Joi.string().required(),
    engName: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return next(error)

  try {
    await Occupation.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
