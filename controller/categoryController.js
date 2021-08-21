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
    await Categories.update(category, {
      where: {
        id: cateroryId
      }
    })
    res.json({ status: 200, message: 'Success' })
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

async function findOne (req, res) {
  try {
    const id = req.params.id
    const category = await Categories.findByPk(id, {
      include: {
        model: ChildTypes
      }
    })
    res.json({ status: 200, category })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function remove (req, res) {
  try {
    const ids = req.body.ids
    await Categories.destroy({
      where: {
        id: ids
      }
    })
    res.json({ status: 200, message: 'Success' })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  create,
  update,
  index,
  findOne,
  remove
}
