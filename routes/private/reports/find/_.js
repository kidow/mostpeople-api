const Report = require('@models/reports')

// GET /prv/reports
module.exports = async (req, res, next) => {
  try {
    const [result, total] = await Promise.all([
      Report.private.find(req.query),
      Report.private.findTotal()
    ])
    res.status(200).json({ result, total })
  } catch (err) {
    next(err)
  }
}
