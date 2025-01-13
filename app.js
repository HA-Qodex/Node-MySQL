const express = require('express')
const router = require('./routes/apiRoute')
const bodyParser = require('body-parser')
const {invalidRoute, errorHandler} = require('./middleware/invalidRoute')
require('dotenv').config()

const app = new express()

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', router)
app.use(invalidRoute)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
