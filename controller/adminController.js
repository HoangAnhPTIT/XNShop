const { Products, Categories, ChildTypes } = require('../model')
const { generateFilterPrice, getProductWithCategory, getProductWithoutCategory } = require('../helper/filterHelper')

async function index (req, res) {
  const { limit, page, categoryId, minPrice, maxPrice } = req.query
  const priceFilter = generateFilterPrice(minPrice, maxPrice)
  try {
    let products
    if (categoryId) products = await getProductWithCategory(categoryId, priceFilter, page, limit)
    else products = await getProductWithoutCategory(priceFilter, page, limit)
    const categories = await Categories.findAll({
      attributes: ['id', 'name', 'code'],
      include: {
        model: ChildTypes,
        attributes: ['id', 'name', 'code']

      }
    })
    const numberRecord = await Products.count()
    res.json({ products, categories, numberRecord })
  } catch (error) {
    res.status(422).json(error)
  }
}

async function dataForCreateProduct (req, res) {
  try {
    const category = await Categories.findAll({
      attributes: ['id', 'name', 'code'],
      include: {
        model: ChildTypes,
        attributes: ['id', 'name', 'code']

      }
    })
    res.json(category)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  index,
  dataForCreateProduct
}
