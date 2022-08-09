// const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const { default: mongoose } = require('mongoose')

// Load config
dotenv.config({path: './config/config.env'})

// Passport Config
require('./config/passport')(passport)

connectDB()

const app = express()

//Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

//Handlebars Helpers
const { formatDate } = require('./helpers/hbs')

// Hnadlebars
app.engine('.hbs', engine({
  helpers: {
    formatDate,
    stripTags,
    truncate,
  },
  extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

// Sessions
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI
  })
})
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder
app.use(express.static('public'))

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`))