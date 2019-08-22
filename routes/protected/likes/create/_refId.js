const Like = require('@models/likes')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// POST /prt/likes/:refId
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    refType: Joi.number().required()
  })
  validate(req.body, schema, res, next)

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
