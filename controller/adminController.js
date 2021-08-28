const { Products, Categories, ChildTypes } = require('../model')
const { getProductWithCategory, getProductWithoutFilter, getProductWithFilterName, getProductWithFullFilter } = require('../helper/filterHelper')

async function getProduct (categoryId, nameFilter, page, limit) {
  if (categoryId && nameFilter) return await getProductWithFullFilter(nameFilter, categoryId, page, limit)
  else if (categoryId) return await getProductWithCategory(categoryId, page, limit)
  else if (nameFilter) return await getProductWithFilterName(nameFilter, page, limit)
  else return getProductWithoutFilter(page, limit)
}

async function index (req, res) {
  const { limit, page, categoryId, nameFilter } = req.query
  try {
    const products = await getProduct(categoryId, nameFilter, page, limit)
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
