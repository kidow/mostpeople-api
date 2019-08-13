module.exports = (err, req, res, next) => {
  let message = err.message
  let status = err.status || 500
  if (err.isJoi) message = '값을 모두, 또는 올바르게 입력했는지 확인해 주세요.'
  console.log('middle err: ', err)
  res.status(status).json({ success: false, message })
}
