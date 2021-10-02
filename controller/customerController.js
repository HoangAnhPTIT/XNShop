const { Customers, CustomerProducts, Products } = require('../model')
const { sequelize } = require('../util/connectDb')

async function addInfor (req, res) {
  const transaction = await sequelize.transaction()
  try {
    const { productId } = req.query
    const customerData = req.body.customer
    const customerDuplicate = await Customers.findOne({
      where: {
        phoneNumber: customerData.phoneNumber
      }
    })
    if (!customerDuplicate) {
      const customer = await Customers.create(customerData, { transaction })
      await CustomerProducts.create({
        productId,
        customerId: customer.id
      }, { transaction })
    } else {
      await CustomerProducts.create({
        productId,
        customerId: customerDuplicate.id
      }, { transaction })
    }
    await transaction.commit()
    res.json({ message: 'add info customer successly', status: 200 })
  } catch (err) {
    await transaction.rollback()
    res.json({ message: err.message, status: 422 })
  }
}

async function getInfoCustomer (req, res) {
  try {
    const customerProducts = await CustomerProducts.findAll({
      include: [{
        model: Customers,
        attributes: ['name', 'phoneNumber']
      },
      {
        model: Products,
        attributes: ['id', 'name']
      }],
      order: [['status', 'asc'], ['updatedAt', 'desc']]
    })
    res.json(customerProducts)
  } catch (err) {
    res.json(err)
  }
}

async function changeStatusInfo (req, res) {
  const { status } = req.body
  const id = req.params.id
  try {
    await CustomerProducts.update({
      status
    }, {
      where: {
        id
      }
    })
    res.json({ message: 'update status ok', status: 200 })
  } catch (error) {
    res.json({ message: error.message, status: 422 })
  }
}

module.exports = {
  addInfor,
  getInfoCustomer,
  changeStatusInfo
}
