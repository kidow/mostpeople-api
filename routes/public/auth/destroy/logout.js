const cookieOptions = require('@utils/cookieOptions')

// DELETE /auth/logout
module.exports = (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  cookieOptions.expires = new Date()
  res.cookie('access_token', '', cookieOptions)
  res.status(200).json(true)
}
