const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Products = require('./products')
const Categories = require('./categories')
const childTypes = sequelize.define('childTypes', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  code: {
    type: DataTypes.STRING,
    required: true
  }
})

Products.belongsToMany(childTypes, { through: 'childTypeProducts' })
childTypes.belongsToMany(Products, { through: 'childTypeProducts' })

Categories.hasMany(childTypes)
childTypes.belongsTo(Categories)

module.exports = childTypes
