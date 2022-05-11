const express = require('express')
const router = express.Router()
const fs = require('fs')
const sharp = require('sharp')
const multer = require('multer')
const apiKeyHandler = require('../../../middlewares/apiKeyHandler')
const { v4: uuidv4 } = require('uuid')

const uploadStorage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
        callback(null, uuidv4() + file.originalname)
    },
})
const upload = multer({ storage: uploadStorage })
const apiKeyORM = require('../../../db/models/apikey')
const imageORM = require('../../../db/models/image')
const { randomUUID } = require('crypto')

router.use(apiKeyHandler)

router.get('/:id', (req, res, next) => {
    const { w = 500, h = 500 } = req.query
    const imageId = req.params.id

    if (typeof parseInt(w) != 'number' || typeof parseInt(h) !== 'number') {
        next({
            status: 400,
            message:
                'Wrong input for width and height parameters. Please use type number.',
        })
        return
    }

    if (!parseInt(imageId)) {
        next({
            status: 400,
            message: 'Please enter an integer id',
        })
        return
    }

    imageORM
        .query()
        .where('id', '=', imageId)
        .then((image) => {
            const url = image[0].url

            fs.readFile(url, (err, image) => {
                if (err) {
                    next({
                        status: 404,
                        message: 'IMAGE NOT FOUND',
                    })
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
                    next({
                        message:
                            'INTERNAL SERVER ERROR: error while processing image',
                        status: 500,
                    })
                    return
                }
            })
        })
        .catch(() => {
            next({
                status: 404,
                message: 'IMAGE NOT FOUND',
            })
            return
        })
})

router.post('/', upload.single('image_file'), (req, res, next) => {
    try {
        const apiKey = req.header('X-API-KEY')
        apiKeyORM
            .query()
            .where('key', '=', apiKey)
            .then((a) => {
                imageORM
                    .query()
                    .insert({
                        url: req.file.path,
                        user_id: a[0].user_id,
                    })
                    .then((image) => {
                        res.send({ id: image.id })
                    })
            })
    } catch {
        next({
            status: 500,
            message: 'Unexpected error while uploading image.',
        })
    }
})

module.exports = router
