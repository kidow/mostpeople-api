const axios = require('axios')

module.exports = (response, remoteip) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      url: 'https://www.google.com/recaptcha/api/siteverify',
      method: 'get',
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response,
        remoteip
      }
    }
    try {
      const { data } = await axios(options)
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}
