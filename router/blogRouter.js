const express = require('express')
const adminRouter = express.Router()
const { index, create, findOne, update, remove } = require('../controller/blogController')

adminRouter.get('/blogs/', index)
adminRouter.get('/blogs/:id', findOne)
adminRouter.patch('/blogs/:id', update)
adminRouter.post('/blogs/create', create)
adminRouter.delete('/blogs/', remove)

module.exports = adminRouter
