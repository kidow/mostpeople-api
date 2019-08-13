const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = (email, purpose) => {
  return new Promise((resolve, reject) => {
    const code = Math.floor(100000 + Math.random() * 900000)
    const msg = {
      to: email,
      from: process.env.CONTACT_EMAIL,
      subject: `Most People ${purpose}`,
      html: `
        <p>아래의 인증 코드를 입력해주세요.</p>
        <p>[${code}]</p>
      `
    }
    sendgrid
      .send(msg)
      .then(_ => resolve(code))
      .catch(err => reject(err))
  })
}
