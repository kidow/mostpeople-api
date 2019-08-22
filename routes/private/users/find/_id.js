const User = require('@models/users')

// GET /prv/users/:id
module.exports = async (req, res, next) => {
  try {
    const result = await User.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
