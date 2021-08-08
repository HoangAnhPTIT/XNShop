const express = require('express')
const adminRouter = express.Router()
const { index } = require('../controller/adminController')

adminRouter.get('/index', index)
