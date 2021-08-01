const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const bannerRouter = require('./bannerRouter')
const childTypeRouter = require('./childTypeRouter')
const homepageRouter = require('./homepageRouter')
const userRouter = require('./userRouter')
const searchRouter = require('./searchRouter')

module.exports = [
  productRouter,
  categoryRouter,
  bannerRouter,
  childTypeRouter,
  homepageRouter,
  userRouter,
  searchRouter
]
