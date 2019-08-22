const Post = require('@models/posts')

// GET /prv/posts/:id
module.exports = async (req, res, next) => {
  try {
    const result = await Post.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
