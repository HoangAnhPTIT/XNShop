const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Categories = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  code: {
    type: DataTypes.STRING,
    required: true
    // unique: true
  }
})

module.exports = Categories
