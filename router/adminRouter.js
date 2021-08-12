const express = require('express')
const adminRouter = express.Router()
const { index, dataForCreateProduct } = require('../controller/adminController')

adminRouter.get('/admin/index', index)
adminRouter.get('/admin/categories', dataForCreateProduct)

module.exports = adminRouter
