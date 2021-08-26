const { Products, Images, Categories, ChildTypes } = require('../model')
const { sequelize } = require('../util/connectDb')
const { Op } = require('sequelize')
const { uploadFile } = require('../util/s3')
async function createImage (images, productId, transaction) {
  try {
    const imageModels = images.map((image) => {
      const imageModel = {
        url: image,
        productId: productId
      }
      return imageModel
    })
    const imagesRes = await Images.bulkCreate(imageModels, { transaction })
    return imagesRes
  } catch (error) {
    throw new Error(error.message)
  }
}

async function addProductReferent (data, childTypeIds, transaction) {
  const category = await Categories.findAll({
    include: {
      model: ChildTypes,
      where: {
        id: childTypeIds
      }
    }
  })
  await Promise.all([
    data.addChildTypes(childTypeIds, { transaction }),
    data.addCategories(category, { transaction })
  ])
}

async function create (req, res) {
  const product = req.body.newProduct

  const transaction = await sequelize.transaction()
  try {
    const childTypeIds = product.childTypeIds
    const images = product.images

    const data = await Products.create(product, { transaction })
    await addProductReferent(data, childTypeIds, transaction)
    const imagesRes = await createImage(images, data.id, transaction)
    await transaction.commit()
    res.json({ data, images: imagesRes })
  } catch (error) {
    await transaction.rollback()
    res.status(422).json(error.message)
  }
}

async function remove (req, res) {
  const ids = req.body.ids
  try {
    const resp = await Products.destroy({
      where: { id: ids }
    })
    res.json(resp)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function index (req, res) {
  const { limit, page } = req.query
  try {
    const products = await Products.findAll({
      include: {
        model: Images,
        attributes: ['url']
      },
      attributes: [
        'id',
        'name',
        'title',
        'description',
        'originalPrice',
        'promotedPrice',
        'amount',
        'type',
        'createdAt',
        'updatedAt'
      ],
      offset: (page - 1) * limit, // Will have to change
      limit: limit,
      subQuery: false
    })
    res.json(products)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function findOne (req, res) {
  const id = req.params.id
  try {
    const product = await Products.findOne({
      where: {
        id: id
      },
      include: {
        model: Images,
        attributes: ['url']
      },
      attributes: [
        'id',
        'name',
        'title',
        'description',
        'originalPrice',
        'promotedPrice',
        'amount',
        'type',
        'createdAt',
        'updatedAt'
      ]
    })
    res.json(product)
  } catch (error) {
    res.status(422).json(error)
  }
}

async function updateImage (images, productId, transaction) {
  try {
    await Images.destroy({
      where: { productId: productId }
    })
    const imagesRes = await createImage(images, productId, transaction)
    return imagesRes
  } catch (error) {
    throw new Error(error.message)
  }
}

async function update (req, res) {
  const product = req.body.newProduct
  const productId = req.params.id
  const { images, childTypeIds } = product
  const transaction = await sequelize.transaction()

  try {
    await Products.update(
      product,
      {
        where: { id: productId }
      },
      { transaction }
    )
    await updateImage(images, productId, transaction)
    const productUpdated = await Products.findByPk(productId,
      {
        include: [
          {
            model: Categories
          },
          {
            model: ChildTypes
          }
        ]
      })
    await productUpdated.removeChildTypes(productUpdated.childTypes, { transaction })
    await productUpdated.removeCategories(productUpdated.categories, { transaction })
    await addProductReferent(productUpdated, childTypeIds, transaction)
    await transaction.commit()
    res.json({ message: 'Update product success' })
  } catch (error) {
    await transaction.rollback()
    res.status(422).json(error.message)
  }
}

function generateFilter (req) {
  const { price } = req.query
  const priceFilter = {}
  if (price) {
    const priceRange = price.split(':')
    if (priceRange[1] === 'max') {
      priceFilter.originalPrice = { [Op.gte]: priceRange[0] }
    } else {
      priceFilter.originalPrice = {
        [Op.between]: [priceRange[0], priceRange[1]]
      }
    }
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

async function uploadImages (req, res) {
  try {
    if (req.files) {
      const files = req.files
      const data = await uploadFile(files)
      res.json(data)
    } else {
      throw new Error('No file assign')
    }
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function getHotProducts (req, res) {
  const { limit, page } = req.query
  try {
    if (page < 1) throw new Error('Page can not negative')

    const hotProducts = await Products.findAll({
      order: [['view', 'DESC']],
      limit: limit,
      offset: limit * (page - 1)
    })
    res.json({ status: 200, hotProducts })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  create,
  index,
  getProductByCollection,
  uploadImages,
  findOne,
  update,
  remove,
  getHotProducts
}
