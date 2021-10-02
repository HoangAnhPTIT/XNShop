const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Customers = sequelize.define('customers', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    required: true
  }
})

module.exports = Customers
