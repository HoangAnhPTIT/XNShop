const express = require('express')
const homepageRouter = express.Router()
const { getDataHomepage } = require('../controller/homepageController')

homepageRouter.get('/homepage', getDataHomepage)

module.exports = homepageRouter
