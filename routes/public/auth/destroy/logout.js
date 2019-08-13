// DELETE /auth/logout
module.exports = (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  res.clearCookie('access_token')
  res.sendStatus(200)
}
