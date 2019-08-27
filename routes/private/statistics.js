const Statistics = require('@models/statistics')

// GET /prv/statistics
module.exports = async (_, res, next) => {
  try {
    const [count, total, kakao, facebook, google] = await Promise.all([
      Statistics.private.findTotal(),
      Statistics.private.findWeeklyUser(),
      Statistics.private.findWeeklyKakao(),
      Statistics.private.findWeeklyFacebook(),
      Statistics.private.findWeeklyGoogle()
    ])
    const result = {
      count,
      weeklyReport: {
        users: {
          total,
          kakao,
          facebook,
          google
        }
      }
    }
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
