const express = require('express')
const childTypeRouter = express.Router()
const { create } = require('../controller/childTypeController')

childTypeRouter.post('/child-type/create', create)

module.exports = childTypeRouter
