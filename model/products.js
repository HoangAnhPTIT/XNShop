const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Categories = require('./categories')
const Products = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    required: true,
    trim: true
  },
  code: {
    type: DataTypes.STRING,
    default: ''
  },
  title: {
    type: DataTypes.STRING,
    default: ''
  },
  description: {
    type: DataTypes.STRING,
    trim: true,
    default: ''
  },
  originalPrice: {
    type: DataTypes.FLOAT,
    default: 0
  },
  promotedPrice: {
    type: DataTypes.FLOAT,
    default: 0
  },
  amount: {
    type: DataTypes.INTEGER,
    default: 0
  },
  status: {
    type: DataTypes.INTEGER,
    enum: [0, 100, 900]
  },
  type: {
    type: DataTypes.STRING
  },
  view: {
    type: DataTypes.INTEGER,
    required: true,
    default: 0
  }
})

Products.belongsToMany(Categories, { through: 'CategoryProducts' })
Categories.belongsToMany(Products, { through: 'CategoryProducts' })

module.exports = Products
