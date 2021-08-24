const express = require('express')
const childTypeRouter = express.Router()
const { create, index, findOne, remove, update } = require('../controller/childTypeController')

childTypeRouter.post('/child-types/create', create)
childTypeRouter.get('/child-types', index)
childTypeRouter.get('/child-types/:id', findOne)
childTypeRouter.patch('/child-types/:id', update)
childTypeRouter.delete('/child-types', remove)

module.exports = childTypeRouter
