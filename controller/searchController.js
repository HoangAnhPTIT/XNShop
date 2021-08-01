const { Products } = require('../model')
const { Op } = require('sequelize')

async function search (req, res) {
  const searchParam = req.query.question.trim()
  const searchCondition = `%${searchParam}%`
  try {
    const products = await Products.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: searchCondition } },
          { title: { [Op.like]: searchCondition } },
          { description: { [Op.like]: searchCondition } }
        ]
      }
    })
    res.json(products)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  search
}
