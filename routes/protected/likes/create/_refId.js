const Like = require('@models/likes')
const Joi = require('@hapi/joi')

// POST /prt/likes/:refId
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const schema = Joi.object().keys({
    refType: Joi.number().required()
  })
  const { error } = Joi.validate(req.body, schema)
  if (error) return res.sendStatus(400)

  const { refId } = req.params
  const { refType } = req.body

  try {
    const isLiked = await Like.protected.findByRefId([req.user.id, refId])
    let addLike
    if (isLiked) {
      addLike = false
      await Like.protected.destroy([req.user.id, refId])
    } else {
      addLike = true
      await Like.protected.create({
        refId: refId,
        refType,
        userId: req.user.id
      })
    }
    res.status(200).json({ addLike })
  } catch (err) {
    next(err)
  }
}
