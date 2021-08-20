const { Blogs } = require('../model')

async function create (req, res) {
  try {
    const blogString = req.body.blogString
    const blog = await Blogs.create({ blogString })
    res.json({ status: 200, blog })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function index (req, res) {
  try {
    const blogs = await Blogs.findAll()
    res.json({ status: 200, blogs })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function findOne (req, res) {
  try {
    const blogId = req.params.id
    console.log(blogId)
    const blog = await Blogs.findByPk(blogId)
    res.json({ status: 200, blog })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function update (req, res) {
  const blogId = req.params.id
  const blogString = req.body.blogString
  try {
    await Blogs.update(
      { blogString },
      {
        where: {
          id: blogId
        }
      }
    )
    res.json({ status: 200, message: 'success' })
  } catch (error) {
    res.status(422).json(error.message)
  }
}

async function remove (req, res) {
  const blogIds = req.body.ids
  try {
    await Blogs.destroy({ where: { id: blogIds } })
    res.json({ status: 200, message: 'success' })
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
