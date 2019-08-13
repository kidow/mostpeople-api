const {
  MYSQL_HOST_SANDBOX,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
  NODE_ENV
} = process.env

const connection = require('mysql').createConnection({
  host: NODE_ENV === 'development' ? MYSQL_HOST_SANDBOX : MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  multipleStatements: true
})

connection.connect(err => {
  if (err) return console.log('\nError connecting database ... \n' + err)
  console.log(`\nDatabase "${connection.config.database}" is connected ... \n`)
})

module.exports = connection
