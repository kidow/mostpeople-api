const Improvement = require('@models/improvements')

// GET /prv/improvements
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      Improvement.private.find(req.query),
      Improvement.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
