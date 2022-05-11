require('./config/config')
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const sharp = require('sharp')
const path = require('path')

const reuqestLoggerMiddleware = (req, res, next) => {
    console.log('RequestLogger:')
    console.log(req)
    next()
}

const uploadStorage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    },
})
const upload = multer({ storage: uploadStorage })

const app = express()

app.use(reuqestLoggerMiddleware)

app.get('/api/images', (req, res, next) => {
    const { w = 500, h = 500 } = req.query
    const filePath = `uploads/${fs.readdirSync('uploads')[0]}`

    if (typeof w != 'number' || typeof h !== 'number') {
        next({
            status: 400,
            message:
                'Wrong input for width and height parameters. Please use type number.',
        })
    }

    fs.readFile(filePath, (err, image) => {
        if (err) {
            res.status(404).send({ message: 'IMAGE NOT FOUND', status: 404 })
            return
        }

        try {
            sharp(image)
                .resize({ width: parseInt(w), height: parseInt(h) })
                .toBuffer()
                .then((data) => {
                    res.end(data)
                })
        } catch (err) {
            res.status(500).send({
                message: 'INTERNAL SERVER ERROR: error while processing image',
                status: 500,
            })
        }
    })
})

app.post('/api/images', upload.single('image'), (req, res) => {
    res.send({ message: 'IMAGE UPLOADED', status: 201 })
})

app.use((error, request, response, next) => {
    if (error.status && error.message) {
        response.status(error.status).json(error)
    } else {
        response.status(500).json({
            status: 500,
            message: 'Something went wrong',
        })
    }

    console.log(error)
})

app.listen(3000, () => {
    console.log('Image Upload Service Running on Port 3000 ...')
})
