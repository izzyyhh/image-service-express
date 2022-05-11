const express = require('express')
const router = express.Router()
const User = require('../../../db/models/user')
const ApiKey = require('../../../db/models/apikey')
const { v4: uuidv4 } = require('uuid')
const masterKeyHandler = require('../../../middlewares/masterKeyHandler')

router.use(masterKeyHandler)

router.post('/', (req, res, next) => {
    const { name } = req.body

    if (typeof name !== 'string' || name === '' || name.length > 254) {
        next({
            status: 400,
            message: 'Please insert valid name!',
        })
        return
    }

    User.query()
        .insert({
            name: name,
        })
        .then((user) => {
            ApiKey.query()
                .insert({
                    key: uuidv4(),
                    user_id: user.id,
                })
                .then((apikey) => {
                    res.send({
                        id: user.id,
                        name: user.name,
                        apiKeys: [apikey.key],
                    })
                })
                .catch(() => {
                    next({
                        status: 500,
                        message: 'was not able to create apikey',
                    })
                    return
                })
        })
        .catch(() => {
            next({
                status: 500,
                message: 'was not able to create User',
            })
            return
        })
})

module.exports = router
