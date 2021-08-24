const { ChildTypes } = require('../model')

async function index (req, res) {
  try {
    const childTypes = await ChildTypes.findAll()
    res.json(childTypes)
  } catch (error) {
    res.status(422).json(error)
  }
}

async function create (req, res) {
  try {
    const childType = req.body.childType
    const childTypeRes = await ChildTypes.create(childType)
    res.json(childTypeRes)
  } catch (error) {
    res.status(422).json(error)
  }
}

async function findOne (req, res) {
  try {
    const id = req.params.id
    const childType = await ChildTypes.findByPk(id)
    res.json({ status: 200, childType })
  } catch (error) {
    res.status(422).json(error)
  }
}

async function update (req, res) {
  try {
    const childType = req.body.childType
    const id = req.params.id
    await ChildTypes.update(childType, {
      where: { id }
    })
    res.json({ status: 200, message: 'Success' })
  } catch (error) {
    res.status(422).json(error)
  }
}

async function remove (req, res) {
  try {
    const ids = req.body.ids
    await ChildTypes.destroy({
      where: {
        id: ids
      }
    })
    res.json({ status: 200, message: 'Success' })
  } catch (error) {
    res.status(422).json(error)
  }
}

module.exports = {
  index,
  create,
  findOne,
  update,
  remove
}
