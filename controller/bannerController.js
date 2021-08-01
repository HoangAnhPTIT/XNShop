const { Banners } = require('../model')

async function create (req, res) {
  const banner = req.body.banner
  try {
    const bannerRes = await Banners.create(banner)
    res.json(bannerRes)
  } catch (error) {
    res.status(422).json(error)
  }
}

async function index (req, res) {
  try {
    const banners = await Banners.findAll({ order: ['position'], limit: 4 })
    res.json(banners)
  } catch (error) {
    res.status(422).json(error)
  }
}

module.exports = {
  create,
  index
}
