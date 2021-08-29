const { Banners } = require('../model')

async function create (req, res) {
  const banner = req.body.banner
  try {
    const bannerRes = await Banners.create(banner)
    res.json(bannerRes)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function index (req, res) {
  try {
    const banners = await Banners.findAll({ order: ['position'], limit: 4 })
    res.json(banners)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function findOne (req, res) {
  try {
    const id = req.params.id
    const banner = await Banners.findByPk(id)
    res.json(banner)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function update (req, res) {
  try {
    const id = req.params.id
    const banner = req.body.banner
    await Banners.update(banner, {
      where: { id }
    })
    res.json({ massage: 'Update banner success !!!' })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function remove (req, res) {
  try {
    const ids = req.body.ids
    await Banners.destroy({
      where: {
        id: ids
      }
    })
    res.json({ message: 'Remove banners success !!' })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

module.exports = {
  create,
  index,
  findOne,
  update,
  remove
}
