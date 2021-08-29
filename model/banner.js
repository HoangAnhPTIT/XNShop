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
  link: {
    type: DataTypes.STRING,
    required: true
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

// Banners.sync({ alter: true })
//   .then(() => {
//     console.log('Banners model was updated !!!')
//   })
//   .catch(() => {
//     console.log('Banners model updates faily !!!')
//   })

module.exports = Banners
