const Post = require('@models/posts')
const Occupation = require('@models/occupations')
const User = require('@models/users')

// GET /search
module.exports = async (req, res, next) => {
  const { keyword } = req.query
  if (!keyword) return res.sendStatus(400)
  try {
    const [posts, occupations, users] = await Promise.all([
      Post.findBySearch([`%${keyword}%`, `%${keyword}%`]),
      Occupation.findBySearch(`%${keyword}%`),
      User.findBySearch(`%${keyword}%`)
    ])
    res.status(200).json({ posts, occupations, users })
  } catch (err) {
    next(err)
  }
}
