require('./config/config')
const express = require('express')
const apiRoutes = require('./routes/api/api')
const errorHandler = require('./middlewares/errorhandler')
const requestLogger = require('./middlewares/requestlogger')

const app = express()

app.use(requestLogger)
app.use(express.json())

app.use('/api', apiRoutes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Image Upload Service Running on Port 3000 ...')
})
