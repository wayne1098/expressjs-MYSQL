
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
   
    host: 'localhost',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    database: 'wawan-crudsv2'

});

(async () => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
