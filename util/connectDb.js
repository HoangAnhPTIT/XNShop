const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('XNShop', 'admin', 'password', {
  host: 'localhost',
  dialect: 'mysql',
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
