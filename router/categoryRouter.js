const express = require('express')
const categoryRouter = express.Router()
const { create, update } = require('../controller/categoryController')

categoryRouter.post('/category/create', create)
categoryRouter.patch('/category/:id', update)

module.exports = categoryRouter
