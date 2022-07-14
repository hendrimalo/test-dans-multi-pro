const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'hendrimalo',
        password: await bcrypt.hashSync('test123', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'angelikha',
        password: await bcrypt.hashSync('test123', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
