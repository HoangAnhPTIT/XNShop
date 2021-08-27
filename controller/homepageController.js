const {
  Banners,
  Products,
  Categories,
  ChildTypes,
  Images
} = require('../model')
async function getGiftProduct () {
  const giftProduct = await Products.findAll({
    where: {
      type: 'gift'
    }
  })
  return giftProduct
}

async function getHighLightProducts () {
  const hightLightProduct = await Products.findAll({
    include: [
      {
        model: ChildTypes,
        attributes: []
      },
      {
        model: Images,
        attributes: ['url']
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: 6
  })
  return hightLightProduct
}

async function getProductByCategories () {
  try {
    const productCategory = await Categories.findAll({
      attributes: ['id', 'name'],
      include: {
        model: ChildTypes,
        attributes: ['id', 'name'],
        include: {
          model: Products,
          include: {
            model: Images,
            attributes: ['url']
          }
        }
      }
    })
    return productCategory
  } catch (error) {
    throw new Error(error.message)
  }
}

async function getDataHomepage (req, res) {
  try {
    const banners = await Banners.findAll({ order: ['position'], limit: 4 })
    const giftProduct = await getGiftProduct()
    const productCategory = await getProductByCategories()
    const highLightProducts = await getHighLightProducts()
    res.json({
      banners,
      giftProduct,
      productCategory,
      highLightProducts
    })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  getDataHomepage
}
