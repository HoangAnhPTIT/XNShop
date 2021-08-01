const { Banners, Products, Categories, ChildTypes } = require('../model')
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
  const listChildType = await category.getChildTypes()
  const listNameChildType = listChildType.map(x => x.name)
  const listProduct = {}
  for (const childType of listChildType) {
    const name = childType.name
    const products = await Products.findAll({
      where: {
        type: { [Op.ne]: 'GIFT' }
      },
      include: {
        model: ChildTypes,
        where: { id: childType.id },
        attributes: []
      }
    })
    listProduct[name] = products
  }
  listProduct.listNameChildType = listNameChildType
  return listProduct
}

async function getHightLightProduct () {
  const hightLightProduct = await Products.findAll({
    order: [['quantityPurchased', 'DESC']],
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
