const express = require('express')
const productRouter = express.Router()
const {
  create,
  index,
  getProductByCollection,
  uploadImages,
  findOne,
  update,
  remove,
  getHotProducts
} = require('../controller/productController')
const upload = require('../util/multer')

productRouter.post('/product/create', create)
productRouter.get('/products', index)
productRouter.get('/products/collection', getProductByCollection)
productRouter.post('/product/images', upload.array('images', 10), uploadImages)
productRouter.get('/product/:id', findOne)
productRouter.patch('/product/:id', update)
productRouter.delete('/product/', remove)
productRouter.get('/products/hot-product', getHotProducts)

module.exports = productRouter
