const { Users } = require('../model')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../util/connectDb')
const roleEnum = require('../model/enum/roleEnum')

function createToken (user) {
  const tokenJwt = jwt.sign(
    { email: user.email, name: user.name, id: user.id },
    'RESTFULAPIs',
    { expiresIn: '1h' }
  )
  return tokenJwt
}

async function checkAvailableUser (user) {
  const userChecked = await Users.findOne({
    where: {
      [Op.or]: [{ username: user.username }, { email: user.email }]
    }
  })
  if (userChecked) return true
  return false
}

async function register (req, res) {
  const user = req.body.user
  const transaction = await sequelize.transaction()
  try {
    if (!checkAvailableUser(user)) { throw new Error('username or email is registered') }
    const newUser = await Users.create(user, { transaction })
    const { userRoles } = sequelize.models
    await userRoles.create(
      {
        userId: newUser.id,
        roleId: roleEnum.admin
      },
      { transaction }
    )
    await transaction.commit()
    res.json({ token: createToken(newUser) })
  } catch (error) {
    await transaction.rollback()
    res.status(422).json(error)
  }
}

async function signIn (req, res) {
  const { username, password, email } = req.body
  const userDb = await Users.findOne({
    where: {
      [Op.or]: [{ username: username || '' }, { email: email }]
    }
  })
  if (!userDb) { res.status(401).json({ message: 'Authentication failed. User not found.' }) }
  if (!Users.comparePassword(password, userDb.password)) { res.status(401).json({ message: 'Authentication failed. Wrong password.' }) }
  res.json(createToken(userDb))
}

async function changeInfo (req, res) {
  const userId = req.user.id
  const userInfo = req.body.user
  try {
    const userUpdate = await Users.update(userInfo, {
      where: {
        id: userId
      }
    })
    res.json(userUpdate)
  } catch (error) {
    res.status(422).json(error)
  }
}

function loginRequired (req, res, next) {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

async function adminRequired (req, res, next) {
  const id = req.user.id
  const userLogin = await Users.findByPk(id)
  if (userLogin.role === 'ADMIN') {
    next()
  } else {
    return res.status(401).json({ message: 'User not permission !!!' })
  }
}

module.exports = {
  register,
  adminRequired,
  changeInfo,
  signIn,
  loginRequired
}
