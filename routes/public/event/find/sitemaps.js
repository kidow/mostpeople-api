const Event = require('@models/event')

// GET /event/sitemaps
module.exports = async (_, res, next) => {
  try {
    const result = await Event.findSitemaps({})
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
