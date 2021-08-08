const { Products } = require('../model')

async function index (req, res) {
  const { limit, page } = req.query
  try {
    const products = await Products.findAll({
      offset: ((page - 1) * limit),
      limit: limit,
      subQuery: false
    })
    res.json(products)
  } catch (error) {
    res.status(422).json(error)
  }
}

module.exports = {
  index
}
