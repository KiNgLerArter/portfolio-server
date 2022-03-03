'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'name', Sequelize.STRING);
    await queryInterface.addColumn('users', 'surname', Sequelize.STRING);
    await queryInterface.addColumn('users', 'nickname', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'name');
    await queryInterface.removeColumn('users', 'surname');
    await queryInterface.removeColumn('users', 'nickname');
  },
};
