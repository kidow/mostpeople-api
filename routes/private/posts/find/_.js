const Post = require('@models/posts')

// GET /prv/posts
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      Post.private.find(req.query),
      Post.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
