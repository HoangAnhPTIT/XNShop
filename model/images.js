const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Products = require('./products')
const Images = sequelize.define('images', {
  url: {
    type: DataTypes.STRING,
    required: true
  }
})

Images.belongsTo(Products)
Products.hasMany(Images)
module.exports = Images
