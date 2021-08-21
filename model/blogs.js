const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')

const Blogs = sequelize.define('blogs', {
  blogString: {
    type: DataTypes.STRING,
    require: true
  },
  view: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { timestamps: true })

module.exports = Blogs
