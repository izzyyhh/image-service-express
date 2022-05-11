/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('users').del()
    await knex('images').del()
    await knex('api-keys').del()
    await knex('users').insert([
        { id: 1, name: 'Valentin' },
        { id: 2, name: 'Izzy' },
        { id: 3, name: 'Erfan' },
    ])
    await knex('images').insert([
        { id: 1, url: 'uploads/doombackground.png', user_id: 1 },
    ])
    await knex('api-keys').insert([
        { id: 1, key: 'f21f5a7c-9988-4c77-9d5b-fccc1c72974c', user_id: 1 },
        { id: 2, key: '842c22f8-8640-4579-a5e0-cf094249feb8', user_id: 2 },
        { id: 3, key: '552faf4b-ab8b-402e-8a18-372f58be7201', user_id: 3 },
    ])
}
