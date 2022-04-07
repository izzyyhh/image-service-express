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

app.get('/api/images', (req, res) => {
    const { w = 500, h = 500 } = req.query
    const filePath = `uploads/${fs.readdirSync('uploads')[0]}`

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

app.listen(3000, () => {
    console.log('Image Upload Service Running on Port 3000 ...')
})
