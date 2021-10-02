const { Customers, CustomerProducts } = require('../model')
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
        customerId: customerData.customerId
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
    const customers = await Customers.findAll({
      include: {
        model: CustomerProducts
      },
      order: [[CustomerProducts, 'status', 'asc'], [CustomerProducts, 'updatedAt', 'desc']]
    })
    res.json(customers)
  } catch (err) {
    res.json(err)
  }
}

async function changeStatusInfo (req, res) {
  const { productId, customerId, status } = req.body
  try {
    await CustomerProducts.update({
      status
    }, {
      where: {
        productId, customerId
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
