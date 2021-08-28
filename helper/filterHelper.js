const { Op } = require('sequelize')
const { Products, Categories, ChildTypes, Images } = require('../model')

function generateFilterPrice (minPrice, maxPrice) {
  const priceFilter = {}
  if (minPrice && maxPrice) {
    priceFilter.originalPrice = {
      [Op.between]: [minPrice, maxPrice]
    }
  } else if (minPrice) {
    priceFilter.originalPrice = {
      [Op.gte]: minPrice
    }
  } else if (maxPrice) {
    priceFilter.originalPrice = {
      [Op.lte]: maxPrice
    }
  } else {
    priceFilter.originalPrice = {
      [Op.gte]: 0
    }
  }
  return priceFilter
}

async function getProductWithCategory (categoryId, priceFilter, page, limit) {
  const products = await Products.findAll({
    where: [priceFilter],
    offset: page,
    limit: limit,
    order: [['createdAt', 'DESC']],
    include: [{
      model: ChildTypes,
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
  return products
}

async function getProductWithoutCategory (priceFilter, page, limit) {
  const products = await Products.findAll({
    where: [priceFilter],
    offset: page,
    limit: limit,
    order: [['createdAt', 'DESC']],
    include: [{
      model: ChildTypes,
      attributes: ['id']
    }, {
      model: Images,
      attributes: ['id', 'url']
    }, {
      model: Categories,
      attributes: []
    }]
  })
  return products
}

module.exports = {
  generateFilterPrice,
  getProductWithCategory,
  getProductWithoutCategory

}
