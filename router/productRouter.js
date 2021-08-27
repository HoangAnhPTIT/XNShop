const express = require('express')
const productRouter = express.Router()
const {
  create,
  index,
  getProductByCollection,
  uploadImages,
  findOne,
  update,
  remove
} = require('../controller/productController')
const upload = require('../util/multer')

productRouter.post('/product/create', create)
productRouter.get('/products', index)
productRouter.get('/collection', getProductByCollection)
productRouter.post('/product/images', upload.array('images', 10), uploadImages)
productRouter.get('/product/:id', findOne)
productRouter.patch('/product/:id', update)
productRouter.delete('/product/', remove)

module.exports = productRouter
