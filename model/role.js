const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')

const Roles = sequelize.define('roles', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  code: {
    type: DataTypes.STRING,
    required: true
  }
}, { timestamps: false })

module.exports = Roles
