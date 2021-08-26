const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Categories = require('./categories')
const Products = sequelize.define(
  'products',
  {
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
      required: true
    },
    originalPrice: {
      type: DataTypes.FLOAT,
      required: true
    },
    promotedPrice: {
      type: DataTypes.FLOAT,
      required: true
    },
    amount: {
      type: DataTypes.INTEGER,
      required: true
    },
    status: {
      type: DataTypes.INTEGER,
      enum: [0, 100, 900]
    },
    type: {
      type: DataTypes.STRING,
      required: true
    },
    view: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0
    },
    purchases: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0
    }

  }
)

Products.belongsToMany(Categories, { through: 'categoryProducts' })
Categories.belongsToMany(Products, { through: 'categoryProducts' })

module.exports = Products
