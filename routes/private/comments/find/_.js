const Comment = require('@models/comments')

// GET /prv/comments
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      Comment.private.find(req.query),
      Comment.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
