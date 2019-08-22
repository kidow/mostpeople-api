const Comment = require('@models/comments')
const Joi = require('@hapi/joi')
const validate = require('@lib/validate')

// PUT /prv/comments/:id
module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    status: Joi.number().required()
  })
  validate(req.body, schema, res, next)

  try {
    await Comment.private.update([req.body, req.params.id])
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
