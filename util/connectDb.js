const { Sequelize } = require('sequelize')
require('dotenv').config()
// const username = process.env.USERNAMEDB
// const database = process.env.DATABASE
// const password = process.env.PASSWORD
// const host = process.env.HOST
const sequelize = new Sequelize(process.env.URL_CONNECT_DB)

async function synchronizingModel () {
  await sequelize.sync({ alter: true })
}

module.exports = { sequelize, synchronizingModel }
