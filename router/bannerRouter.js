const express = require('express')
const bannerRouter = express.Router()
const { create, index, findOne, update, remove } = require('../controller/bannerController')

bannerRouter.post('/banners/create', create)
bannerRouter.get('/banners', index)
bannerRouter.get('/banners/:id', findOne)
bannerRouter.patch('/banners/:id', update)
bannerRouter.delete('/banners', remove)

module.exports = bannerRouter
