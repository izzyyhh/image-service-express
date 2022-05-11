const express = require('express')
const router = express.Router()

const imageRoutes = require('./images/image')
const userRoutes = require('./users/users')

module.exports = router.use('/images', imageRoutes).use('/users', userRoutes)
