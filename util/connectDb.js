const { Sequelize } = require('sequelize')
require('dotenv').config()
const username = process.env.USERNAMEDB
const database = process.env.DATABASE
const password = process.env.PASSWORD
const host = process.env.HOST
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

async function synchronizingModel () {
  await sequelize.sync({ alter: true })
}

module.exports = { sequelize, synchronizingModel }
