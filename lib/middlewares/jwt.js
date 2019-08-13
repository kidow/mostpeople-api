const { encodeToken, decodeToken } = require('@lib/jwt')

module.exports = async (req, res, next) => {
  const token = req.cookies['access_token']
  if (!token) return next()

  try {
    const decoded = await decodeToken(token)
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const freshToken = await encodeToken(decoded, 'user') // 차후에 email이 아닌 name으로
      res.cookie('access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      })
    }
    req.user = decoded
  } catch (e) {
    req.user = null
  }

  next()
}
