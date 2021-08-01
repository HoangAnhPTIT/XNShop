const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')

const Banners = sequelize.define('banners', {
  title: {
    type: DataTypes.STRING,
    required: true
  },
  description: {
    type: DataTypes.STRING,
    required: true
  },
  linkA: {
    type: DataTypes.STRING,
    required: true
  },
  linkB: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING,
    required: true
  },
  position: {
    type: DataTypes.INTEGER,
    required: true
  }
})

module.exports = Banners
