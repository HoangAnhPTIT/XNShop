const { Products, Images, Categories, ChildTypes } = require('../model')
const { sequelize } = require('../util/connectDb')
const { uploadFile } = require('../util/s3')
const { generateFilterPrice } = require('../helper/filterHelper')
const { removeVietnameseTones } = require('../helper/languageHelper')
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
  product.nameParse = removeVietnameseTones(product.name).toLowerCase()
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
  product.nameParse = removeVietnameseTones(product.name).toLowerCase()
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
    if (images.length) { await updateImage(images, productId, transaction) }
    const productUpdated = await Products.findByPk(productId, {
      include: [
        {
          model: Categories
        },
        {
          model: ChildTypes
        }
      ]
    })
    await productUpdated.removeChildTypes(productUpdated.childTypes, {
      transaction
    })
    await productUpdated.removeCategories(productUpdated.categories, {
      transaction
    })
    await addProductReferent(productUpdated, childTypeIds, transaction)
    await transaction.commit()
    res.json({ message: 'Update product success' })
  } catch (error) {
    await transaction.rollback()
    res.status(422).json(error.message)
  }
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
  const { limit, page, type, minPrice, maxPrice } = req.query
  try {
    const priceFilter = generateFilterPrice(minPrice, maxPrice)
    const orderParams = generateOrderCondition(req)
    let collectionProduct
    if (type === 'highlight') {
      collectionProduct = await Products.findAll({
        where: [priceFilter],
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: limit * (page - 1),
        include: {
          model: Images,
          attributes: ['url']
        }
      })
    } else {
      collectionProduct = await Products.findAll({
        where: [priceFilter, { type: type }],
        order: orderParams,
        limit: limit,
        offset: limit * (page - 1),
        include: {
          model: Images,
          attributes: ['url']
        }
      })
    }
    res.json({ status: 200, collectionProduct })
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

module.exports = {
  create,
  index,
  getProductByCollection,
  uploadImages,
  findOne,
  update,
  remove
}
