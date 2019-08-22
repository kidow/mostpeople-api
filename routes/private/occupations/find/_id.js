const Occupation = require('@models/occupations')

// GET /prv/occupations/:id
module.exports = async (req, res, next) => {
  try {
    const result = await Occupation.private.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
