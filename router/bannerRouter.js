const express = require('express')
const bannerRouter = express.Router()
const { create, index } = require('../controller/bannerController')

bannerRouter.post('/banner/create', create)
bannerRouter.get('/banners', index)

module.exports = bannerRouter
