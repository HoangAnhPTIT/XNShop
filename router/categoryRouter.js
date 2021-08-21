const express = require('express')
const categoryRouter = express.Router()
const { create, update, index, remove, findOne } = require('../controller/categoryController')

categoryRouter.post('/categories/create', create)
categoryRouter.patch('/categories/:id', update)
categoryRouter.get('/categories', index)
categoryRouter.get('/categories/:id', findOne)
categoryRouter.delete('/categories', remove)
module.exports = categoryRouter
