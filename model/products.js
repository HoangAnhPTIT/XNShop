const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Categories = require('./categories')
const Products = sequelize.define(
  'products',
  {
    name: {
      type: DataTypes.TEXT,
      required: true,
      trim: true
    },
    code: {
      type: DataTypes.STRING,
      default: ''
    },
    title: {
      type: DataTypes.TEXT,
      default: ''
    },
    description: {
      type: DataTypes.TEXT,
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
      type: DataTypes.ENUM('before', 'now', 'gift', 'other'),
      required: true
    },
    view: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0
    },
    nameParse: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  }
)

Products.belongsToMany(Categories, { through: 'categoryProducts' })
Categories.belongsToMany(Products, { through: 'categoryProducts' })

module.exports = Products
