const User = require('@models/users')
const Joi = require('@hapi/joi')

// PUT /prt/users
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  console.log(req.body)

  const schema = Joi.object().keys({
    nickname: Joi.string()
      .min(3)
      .max(8)
      .required(),
    korName: Joi.string(),
    facebookUrl: Joi.string().allow(null),
    twitterUrl: Joi.string().allow(null),
    intro: Joi.string().allow(null),
    uuid: Joi.string().required(),
    occupationId: Joi.string().allow(null)
  })
  const { error } = Joi.validate(req.body, schema)
  if (error)
    return process.env.NODE_ENV === 'production'
      ? res.sendStatus(405)
      : next(error)

  if (req.body.uuid !== req.user.uuid)
    return res.status(401).json({ message: '권한이 없습니다.' })

  try {
    await User.protected.update([req.body, { id: req.user.id }])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
