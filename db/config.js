const { Model } = require('objection')
const Knex = require('knex')

Model.knex(
    Knex({
        client: 'pg',
        connection: process.env.DB_URL,
    })
)
