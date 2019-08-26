const User = require('@models/users')
const moment = require('moment')

// DELETE /prt/users
module.exports = async (req, res, next) => {
  try {
    await User.protected.update([
      { status: 4, deletedAt: moment().format('YYYY-MM-DD hh:mm:ss') },
      { id: req.user.id }
    ])
    req.logout()
    req.session.destroy()
    req.user = null
    res.clearCookie('access_token')
    res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
