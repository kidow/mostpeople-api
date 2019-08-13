const Occupation = require('@models/occupations')

// GET /occupations/search
module.exports = async (req, res, next) => {
  const { name } = req.query

  try {
    const result = await Occupation.findByName(`%${name}%`)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
