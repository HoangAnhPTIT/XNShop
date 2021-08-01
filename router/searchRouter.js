const express = require('express')
const searchRouter = express.Router()
const { search } = require('../controller/searchController')

searchRouter.get('/search', search)

module.exports = searchRouter
