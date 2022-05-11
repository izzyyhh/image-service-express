const apiKeyORM = require('../db/models/apikey')

module.exports = (req, res, next) => {
    const givenApiKey = req.header('X-API-KEY')

    try {
        if (givenApiKey) {
            apiKeyORM
                .query()
                .where('key', '=', givenApiKey)
                .then((k) => {
                    if (k.length === 0) {
                        throw new Error()
                    }
                    next()
                })
                .catch(() => {
                    next({
                        status: 401,
                        message: 'Unauthorized. API invalid',
                    })
                })
        } else {
            next({
                status: 401,
                message: 'Unauthorized. No API key provided.',
            })
        }
    } catch {
        next({
            status: 500,
            message:
                'Something unexpected happened while processing the API key',
        })
    }
}
