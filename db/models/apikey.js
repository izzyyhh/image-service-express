const Model = require('../config')
const User = require('./user')

module.exports = class ApiKey extends Model {
    static get tableName() {
        return 'api-keys'
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'api-keys.user_id',
                    to: 'users.id',
                },
            },
        }
    }
}
