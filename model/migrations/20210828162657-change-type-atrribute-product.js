'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('products', 'name', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
      queryInterface.changeColumn('products', 'title', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
      queryInterface.changeColumn('products', 'description', {
        type: Sequelize.TEXT,
        allowNull: true
      })
    ])
  }

  // down: async (queryInterface, Sequelize) => {
  //   const transaction = await Sequelize.transaction()
  //   return Promise.all([
  //     queryInterface.changeColumn('products', 'name', {
  //       type: Sequelize.STRING,
  //       allowNull: true
  //     }, {
  //       transaction
  //     })
  //   ])
  // }
}
