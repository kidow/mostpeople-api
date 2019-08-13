const Post = require('@models/posts')

// GET /posts/popular
module.exports = async (req, res, next) => {
  try {
    const [posts, total] = await Promise.all([
      Post.findPopular({ ...req.query, limit: 20 }),
      Post.findTotalPopular()
    ])
    posts.forEach((post, i) => (post.key = `${i + 1}`))
    res.status(200).json({ posts, ...total })
  } catch (err) {
    next(err)
  }
}
