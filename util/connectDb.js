const { Sequelize } = require('sequelize')
require('dotenv').config()
const username = process.env.USERNAMEDB
const database = process.env.DATABASE
const password = process.env.PASSWORD
const host = process.env.HOST
const sequelize = new Sequelize({
  database: database,
  username: username,
  password: password,
  host: host,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

async function synchronizingModel () {
  await sequelize.sync({ force: true })
}

module.exports = { sequelize, synchronizingModel }
