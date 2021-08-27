const { Products, Categories, ChildTypes, Images } = require('../model')
const childTypes = require('../model/childType')

async function index (req, res) {
  const { limit, page } = req.query
  try {
    const products = await Products.findAll({
      offset: page,
      limit: limit,
      order: [['createdAt', 'DESC']],
      include: [{
        model: childTypes,
        attributes: ['id']
      }, {
        model: Images,
        attributes: ['id', 'url']
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
