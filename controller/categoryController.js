const { Categories, ChildTypes } = require('../model')

async function create (req, res) {
  const category = req.body.category
  try {
    const data = await Categories.create(category)
    res.json(data)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function update (req, res) {
  const cateroryId = req.params.id
  const category = req.body.category
  try {
    const categoryUpdate = await Categories.update(category, {
      where: {
        id: cateroryId
      }
    })
    res.json(categoryUpdate)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function index (req, res) {
  try {
    const category = await Categories.findAll({
      include: {
        model: ChildTypes
      }
    })
    res.json(category)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  create,
  update,
  index
}
