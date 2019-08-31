const { decodeToken } = require('@lib/jwt')

// GET /auth/email
module.exports = async (req, res, next) => {
  const token = await decodeToken(req.cookies.profile_token)
  try {
    res.status(200).json(token)
  } catch (err) {
    next(err)
  }
}
