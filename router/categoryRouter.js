const express = require('express')
const categoryRouter = express.Router()
const { create, update, index } = require('../controller/categoryController')

categoryRouter.post('/category/create', create)
categoryRouter.patch('/category/:id', update)
categoryRouter.get('/categories', index)

module.exports = categoryRouter
