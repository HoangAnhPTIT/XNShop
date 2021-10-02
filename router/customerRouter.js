const express = require('express')
const customerRouter = express.Router()
const { addInfor, getInfoCustomer, changeStatusInfo } = require('../controller/customerController')

customerRouter.post('/customer/add-info', addInfor)
customerRouter.get('/customer/get-info', getInfoCustomer)
customerRouter.patch('/customer/update-info', changeStatusInfo)

module.exports = customerRouter
