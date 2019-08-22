const Comment = require('@models/comments')
const Joi = require('@hapi/joi')
const uuid = require('@lib/uuid')
const validate = require('@lib/validate')

// POST /prt/comments/:postId
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    parentId: Joi.number()
  })
  validate(req.body, schema, res, next)

  const { postId } = req.params

  try {
    const payload = Object.assign(req.body, {
      userId: req.user.uuid,
      uuid: uuid(),
      postId
    })
    const { insertId } = await Comment.protected.create(payload)
    const result = await Comment.findById(insertId)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
