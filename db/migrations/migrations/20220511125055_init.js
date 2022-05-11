/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id', { primaryKey: true })
            table.string('name', 255).notNullable()
        })
        .createTable('images', (table) => {
            table.increments('id', { primaryKey: true })
            table.string('url', 512).notNullable()
            table.integer('user_id').foreign('user_id')
            table.foreign('user_id').references('users.id')
        })
        .createTable('api-keys', (table) => {
            table.increments('id')
            table.string('key', 255).notNullable().unique()
            table.integer('user_id')
            table.foreign('user_id').references('users.id')
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
