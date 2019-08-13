const User = require('@models/users')

module.exports = async (req, res, next) => {
  const { nickname } = req.params
  try {
    const user = await User.findByNickname(nickname)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
