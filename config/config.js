const dotenv = require('dotenv')

const envPath =
    process.env.NODE_ENV == 'production'
        ? '.env'
        : `${process.env.NODE_ENV}.env`

dotenv.config({
    path: envPath,
})
