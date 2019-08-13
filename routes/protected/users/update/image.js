const User = require('@models/users')
const Joi = require('@hapi/joi')

// PUT /prt/users/image
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    imageId: Joi.number().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(405)

  const { imageId } = req.body

  try {
    await User.protected.update([{ imageId }, { id: req.user.id }])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
