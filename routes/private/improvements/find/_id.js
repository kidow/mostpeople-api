const Improvement = require('@models/improvements')

// GET /prv/improvements/:id
module.exports = async (req, res, next) => {
  try {
    const result = await Improvement.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
