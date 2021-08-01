const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/connectDb')
const Roles = require('./role')
const bcrypt = require('bcrypt')
const saltRounds = 10

const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set (value) {
      const hashPassword = bcrypt.hashSync(value, saltRounds)
      this.setDataValue('password', hashPassword)
    }
  },
  name: {
    type: DataTypes.STRING
  }
})

Users.comparePassword = function (password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

Users.belongsToMany(Roles, { through: 'userRoles' })
Roles.belongsToMany(Users, { through: 'userRoles' })

module.exports = Users
