const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const encodeToken = payload => {
  const options = {
    issuer: 'mostpeople.kr',
    subject: 'jwt',
    expiresIn: '7d'
  }
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, options, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

const decodeToken = token => {
  return new Promise((resolve, reject) => {
    if (!token) return reject('Token is empty.')
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

module.exports = {
  encodeToken,
  decodeToken
}
