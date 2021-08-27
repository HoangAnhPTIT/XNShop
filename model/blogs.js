const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Blogs = sequelize.define('blogs', {
  blogContent: {
    type: DataTypes.STRING,
    require: true
  },
  title: {
    type: DataTypes.STRING,
    require: true
  }

}, { timestamps: true })

// Blogs.sync({ alter: true })
//   .then(() => {
//     console.log('Blogs model was updated !!!')
//   })
//   .catch(() => {
//     console.log('Blogs model updates faily !!!')
//   })

module.exports = Blogs
