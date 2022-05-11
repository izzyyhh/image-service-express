const Model = require('../config')
const User = require('./user')

module.exports = class Image extends Model {
    static get tableName() {
        return 'images'
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'images.user_id',
                    to: 'users.id',
                },
            },
        }
    }
}
