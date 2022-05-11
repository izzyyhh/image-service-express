// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
            tableName: 'knex_migrations',
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/migrations',
        },
    },
    // production: {
    //     client: 'pg',
    //     connection: process.env.DB_URL,
    //     pool: {
    //         min: 2,
    //         max: 10,
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations',
    //         directory: './db/migrations',
    //     },
    // },
}
