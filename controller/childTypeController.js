const { ChildTypes } = require('../model')

async function create (req, res) {
  try {
    const childType = req.body.childType
    const childTypeRes = await ChildTypes.create(childType)
    res.json(childTypeRes)
  } catch (error) {
    res.status(422).json(error)
  }
}

module.exports = {
  create
}
