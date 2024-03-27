const express = require('express')
require('dotenv').config()
require('./database/connection')

// middleware imports
const morgan = require('morgan')

// import routes
const CategoryRoute = require('./routes/categoryRoute')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))

// using routes
app.use(CategoryRoute)

app.listen(port, ()=>{
    console.log(`App started successfully at port ${port}`)
})