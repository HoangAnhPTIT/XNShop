const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Products = require('./products')
const Customers = require('./customer')
const CustomerProducts = sequelize.define('customerProducts', {
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { timestamps: true })

Products.hasMany(CustomerProducts)
CustomerProducts.belongsTo(Products)

CustomerProducts.belongsTo(Customers)
Customers.hasMany(CustomerProducts)

// CustomerProducts.sync({ force: true })
//   .then(() => {
//     console.log('CustomerProducts model was updated !!!')
//   })
//   .catch(() => {
//     console.log('CustomerProducts model updates faily !!!')
//   })

module.exports = CustomerProducts
