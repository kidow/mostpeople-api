module.exports = (err, req, res, next) => {
  console.log('middle err: ', err)
  res.status(err.status || 500).json({ success: false, message: err.message })
}
