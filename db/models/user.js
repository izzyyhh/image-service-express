const Model = require('../config')
const Image = require('./image')
const ApiKey = require('./apikey')

module.exports = class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        return {
            images: {
                relation: Model.HasManyRelation,
                modelClass: Image,
                join: {
                    from: 'users.id',
                    to: 'images.user_id',
                },
            },
            apiKeys: {
                relation: Model.HasManyRelation,
                modelClass: ApiKey,
                join: {
                    from: 'users.id',
                    to: 'api-keys.user_id',
                },
            },
        }
    }
}
