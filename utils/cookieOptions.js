module.exports = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  domain: process.env.NODE_ENV === 'production' ? '.mostpeople.kr' : 'localhost'
}
