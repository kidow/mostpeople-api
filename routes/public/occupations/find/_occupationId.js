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
    const payload = {
      posts,
      occupation,
      breadcrumbs: [
        {
          url: `/board/${occupation.uuid}`,
          name: `${occupation.korName}`
        }
      ],
      total
    }
    res.status(200).json(payload)
  } catch (err) {
    next(err)
  }
}
