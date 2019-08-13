const Improvement = require('@models/improvements')
const Joi = require('@hapi/joi')

// POST /prv/improvements
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    content: Joi.string().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error)
    return res
      .status(405)
      .json({ message: '값을 올바르게 적었는지 확인해주세요.' })

  try {
    await Improvement.protected.create(req.body)
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
