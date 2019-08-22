module.exports = (err, req, res, next) => {
  let message = err.message
  let status = err.status || 500
  console.log('middle err: ', err)
  res.status(status).json({ success: false, message })
}
