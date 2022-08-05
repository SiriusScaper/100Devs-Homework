// const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const connectDB = require('./config/db')

// Load config
dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// Static Folder
app.use(express.static('public'))

// Routes
app.use('/', require('./routes/index'));

// Hnadlebars
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`))