const Occupation = require('@models/occupations')
const Post = require('@models/posts')

// GET /occupations/:occupationId
module.exports = async (req, res, next) => {
  const { occupationId } = req.params

  try {
    const [posts, occupation, total] = await Promise.all([
      Post.findByOccupationId(req.query, occupationId),
      Occupation.findById(occupationId),
      Post.findTotalByOccupationId(occupationId)
    ])
    posts.forEach((post, i) => (post.key = `${i + 1}`))
    const payload = {
      posts,
      occupation,
      breadcrumbs: [
        {
          uuid: occupation.uuid,
          name: `${occupation.korName}`,
          page: '/board/'
        }
      ],
      total
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
