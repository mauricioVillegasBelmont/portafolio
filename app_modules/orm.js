
const {Sequelize,Model, DataTypes } = require("sequelize");


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER
  }
);

// class StandardObject extends Model {
//   static initialize() {
//     this.init({
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//     }, {
//       sequelize,
//       modelName: 'base_model',
//     });
//   }
// }



module.exports = {
  sequelize: sequelize,
  models: require('./models'),
  init: async function() {
    try{
      await sequelize.authenticate()
      await sequelize.sync();
      console.log('Connection has been established successfully.');
      return sequelize;
    } catch(error){
      console.error('Unable to connect to the database: ', error);
      return null;
    }
  }
}
