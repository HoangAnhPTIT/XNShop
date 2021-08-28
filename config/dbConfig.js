require('dotenv').config()
const username = process.env.USERNAMEDB
const database = process.env.DATABASE
const password = process.env.PASSWORD
const host = process.env.HOST
module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    }
  },
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: 3306,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    }
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: 3306,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    }
  }
}
