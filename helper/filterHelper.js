const { Op } = require('sequelize')

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

module.exports = {
  generateFilterPrice
}
