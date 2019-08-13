const Introduction = require('@models/introductions')
const Joi = require('@hapi/joi')

// PUT /prt/introductions/:occupationId
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    intro: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(405)

  const { intro } = req.body
  const { occupationId } = req.params

  try {
    await Introduction.protected.create({
      content: intro,
      userId: req.user.uuid,
      occupationId
    })
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
