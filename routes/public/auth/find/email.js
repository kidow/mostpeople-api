// GET /auth/email
module.exports = (req, res, next) => {
  try {
    res.status(200).json(req.session.profile)
  } catch (err) {
    next(err)
  }
}
