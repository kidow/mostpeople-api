require('dotenv').config()
require('./lib/moduleAlias')

const express = require('express')
const app = express()
const passport = require('passport')

require('@lib/passport')(passport)

app.use(require('morgan')('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require('cookie-parser')(process.env.COOKIE_SECRET))
app.use(require('@lib/session'))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('@lib/cors'))
app.use(require('@middle/jwt'))
app.use('/', require('./routes'))
app.use(require('@middle/error'))

app.listen(3001, () => console.log(`App listening on port 3001!`))
