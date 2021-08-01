const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('XNShop', 'admin', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    socketPath: '/var/run/mysqld/mysqld.sock'
  },
  define: {
    paranoid: true
  }
})

async function synchronizingModel () {
  await sequelize.sync({ alter: true })
}

module.exports = { sequelize, synchronizingModel }
