const express = require('express')
const productRouter = express.Router()
const { create, index, getProductByCollection } = require('../controller/productController')

productRouter.post('/product/create', create)
productRouter.get('/products', index)
productRouter.get('/products/collection', getProductByCollection)

module.exports = productRouter
