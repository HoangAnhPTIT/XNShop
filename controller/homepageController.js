const { Banners, Products, Categories, ChildTypes, Images } = require('../model')
const { Op } = require('sequelize')
async function getGiftProduct () {
  const giftProduct = await Products.findAll({
    where: {
      type: 'GIFT'
    }
  })
  return giftProduct
}

async function getProductByChildType (categoryCode) {
  const category = await Categories.findOne({
    where: {
      code: categoryCode
    }
  })
  const productData = {}
  const listChildType = await category.getChildTypes()
  const listNameChildType = listChildType.map(x => x.name)
  const listProduct = {}
  for (const childType of listChildType) {
    const name = childType.name
    const products = await Products.findAll({
      where: {
        type: { [Op.ne]: 'GIFT' }
      },
      include: [
        {
          model: ChildTypes,
          where: { id: childType.id },
          attributes: []
        },
        {
          model: Images,
          attributes: ['url']
        }
      ]
    })
    listProduct[name] = products
  }
  productData.listNameChildType = listNameChildType
  productData.listProduct = listProduct
  return productData
}

async function getHightLightProduct () {
  const hightLightProduct = await Products.findAll({
    order: [['view', 'DESC']],
    limit: 6
  })
  return hightLightProduct
}

async function getDataHomepage (req, res) {
  try {
    const banners = await Banners.findAll({ order: ['position'], limit: 4 })
    const giftProduct = await getGiftProduct()
    const listClockProduct = await getProductByChildType('CLOCK')
    const listLightProduct = await getProductByChildType('LIGHT')
    const hightLightProduct = await getHightLightProduct()
    res.json({ banners, giftProduct, listClockProduct, listLightProduct, hightLightProduct })
  } catch (error) {
    res.status(422).json(error)
  }
}

module.exports = {
  getDataHomepage
}
