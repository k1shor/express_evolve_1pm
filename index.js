const express = require('express')
require('dotenv').config()
require('./database/connection')


// middleware imports
const morgan = require('morgan')
const cors = require('cors')

// import routes
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRouter')
const UserRoute = require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// using routes
app.use('/api',CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',UserRoute)
app.use('/api',OrderRoute)

app.use('/public/uploads', express.static('public/uploads'))

app.listen(port, ()=>{
    console.log(`App started successfully at port ${port}`)
})