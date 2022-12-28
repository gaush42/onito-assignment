const Sequelize = require('sequelize')

const dbConnection = new Sequelize(
    'onito_db',
    'root',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)
const db = {}

db.dbConnection = dbConnection
db.Sequelize = Sequelize

module.exports = db