const Report = require('@models/reports')

// GET /prv/reports/:id
module.exports = async (req, res, next) => {
  try {
    const result = await Report.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
