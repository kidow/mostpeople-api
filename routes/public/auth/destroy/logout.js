// DELETE /auth/logout
module.exports = (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  res.clearCookie('access_token', { path: '/' })
  res.status(200).json(true)
}
