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

// Images.sync({ alter: true })
//   .then(() => {
//     console.log('Images model was updated !!!')
//   })
//   .catch(() => {
//     console.log('Images model updates faily !!!')
//   })

module.exports = Images
