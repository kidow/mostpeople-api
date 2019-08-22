const Comment = require('@models/comments')

// GET /prv/comments/:id
module.exports = async (req, res, next) => {
  try {
    const result = await Comment.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
