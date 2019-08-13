// GET /auth/me
module.exports = (req, res) => {
  if (!req.isAuthenticated()) return res.json({ success: false })

  return res.json(req.user)
}
