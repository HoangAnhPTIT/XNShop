const { Products, Images, Categories } = require('../model')
const { sequelize } = require('../util/connectDb')
const { Op } = require('sequelize')
async function createImage (req, res, product, transaction) {
  try {
    let images = req.body.product.images
    images = images.map((image) => {
      image.productId = product.id
      return image
    })
    const imagesRes = await Images.bulkCreate(images, { transaction })
    return imagesRes
  } catch (error) {
    res.status(422).json(error.message)
  }
}
async function validateChildType (category, childTypeIds) {
  const childTypeInCategory = (
    await Promise.all(
      category.map((x) => {
        return x.getChildTypes()
      })
    )
  ).flat()
  const childTypeIdInCategoy = childTypeInCategory.map((x) => {
    return x.id.toString()
  })
  childTypeIds.forEach((childTypeId) => {
    if (!childTypeIdInCategoy.includes(childTypeId)) { throw new Error('Child types has element invalid') }
  })
}

async function addProductReferent (data, childTypeIds, category, transaction) {
  await Promise.all([
    data.addChildTypes(childTypeIds, { transaction }),
    data.addCategories(category, { transaction })
  ])
}

async function create (req, res) {
  const product = req.body.product
  const transaction = await sequelize.transaction()
  try {
    const childTypeIds = product.childTypeIds
    const category = await Categories.findAll({
      where: {
        id: product.categoryIds
      }
    })
    validateChildType(category, childTypeIds)
    const data = await Products.create(product, { transaction })
    await addProductReferent(data, childTypeIds, category, transaction)
    const images = await createImage(req, res, data, transaction)
    await transaction.commit()
    res.json({ data, images })
  } catch (error) {
    await transaction.rollback()
    res.status(422).json(error.message)
  }
}

async function index (req, res) {
  try {
    const products = await Products.findAll({
      include: {
        model: Images,
        attributes: ['url']
      }
    })
    res.json(products)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

function generateFilter (req) {
  const { price } = req.query
  const priceFilter = {}
  if (price) {
    const priceRange = price.split(':')
    if (priceRange[1] === 'max') priceFilter.originalPrice = { [Op.gte]: priceRange[0] }
    else priceFilter.originalPrice = { [Op.between]: [priceRange[0], priceRange[1]] }
  }

  return priceFilter
}

function generateOrderCondition (req) {
  const orderBy = req.query.orderBy
  if (orderBy) {
    const orderByCondition = orderBy.split('-')
    const orderParams = [[orderByCondition[0], orderByCondition[1]]]
    return orderParams
  }
  return ''
}

async function getProductByCollection (req, res) {
  try {
    const collection = req.query.collection
    const priceFilter = generateFilter(req)
    const orderParams = generateOrderCondition(req)
    const products = await Products.findAll({
      where: [priceFilter, { type: collection }],
      order: orderParams
    })
    res.json(products)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  create,
  index,
  getProductByCollection
}
