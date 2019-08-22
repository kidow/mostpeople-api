const User = require('@models/users')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prt/users
module.exports = async (req, res, next) => {
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
  validate(req.body, schema, res, next)

  if (req.body.uuid !== req.user.uuid)
    return res.status(401).json({ message: '권한이 없습니다.' })

  try {
    await User.protected.update([req.body, { id: req.user.id }])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
