const express = require('express')
const userRouter = express.Router()
const { register, signIn } = require('../controller/userController')

userRouter.post('/register', register)
userRouter.post('/signin', signIn)

module.exports = userRouter
