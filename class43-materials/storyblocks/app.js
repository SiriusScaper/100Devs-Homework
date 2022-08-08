// const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

// Load config
dotenv.config({path: './config/config.env'})

// Session
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false
}))

// Passport Config
require('./config/passport')(passport)

connectDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// Static Folder
app.use(express.static('public'))

// Hnadlebars
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`))