const express = require('express')
const productRouter = express.Router()
const { create, index, getProductByCollection, uploadImages } = require('../controller/productController')
const upload = require('../util/multer')

productRouter.post('/product/create', create)
productRouter.get('/products', index)
productRouter.get('/products/collection', getProductByCollection)
productRouter.post('/product/images', upload.array('images', 10), uploadImages)

module.exports = productRouter
