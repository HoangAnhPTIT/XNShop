const express = require('express')
const cors = require('cors')
const app = express()
const { synchronizingModel } = require('./util/connectDb')
const morgan = require('morgan')
const routers = require('./router/index')
const resolveJwtToken = require('./middleware/jwt')

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(morgan('combined'))
app.use(resolveJwtToken)

const port = 8000

// synchronizingModel()
//   .then(() => {
//     console.log('Create table !!!')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

app.post('/ping', async (req, res) => {
  res.json({ message: 'Pinggg' })
})

routers.forEach((router) => {
  app.use('/api/v1', router)
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`App listening at http://localhost:${port}`)
})
