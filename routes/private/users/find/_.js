const User = require('@models/users')

// GET /prv/users
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      User.private.find(req.query),
      User.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
