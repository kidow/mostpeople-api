const Post = require('@models/posts')

// GET /prt/posts?search=&offset=
module.exports = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: '로그인을 해주세요.' })

  const { uuid } = req.user
  try {
    const result = await Post.protected.findByUserUuid([req.query, uuid])
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
