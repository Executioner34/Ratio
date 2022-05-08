const express = require('express')
const route = express.Router()
const userRoute = require('./userRoute')

route.use('/record', userRoute)

module.exports = route