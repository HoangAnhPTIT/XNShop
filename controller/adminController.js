const { Products, Categories, ChildTypes, Images } = require('../model')
const { generateFilterPrice } = require('../helper/filterHelper')

const childTypes = require('../model/childType')

async function index (req, res) {
  const { limit, page, categoryId, minPrice, maxPrice } = req.query
  const priceFilter = generateFilterPrice(minPrice, maxPrice)
  try {
    const products = await Products.findAll({
      where: [priceFilter],
      offset: page,
      limit: limit,
      order: [['createdAt', 'DESC']],
      include: [{
        model: childTypes,
        attributes: ['id']
      }, {
        model: Images,
        attributes: ['id', 'url']
      }, {
        model: Categories,
        attributes: [],
        where: {
          id: categoryId
        }
      }]
    })
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
