const Post = require('@models/posts')

// GET /prt/posts?search=&offset=
module.exports = async (req, res, next) => {
  const { uuid } = req.user
  try {
    const result = await Post.protected.findByUserUuid([req.query, uuid])
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
