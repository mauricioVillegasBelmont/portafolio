const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../orm');
const {serialize, unserialize} = require('php-serialize');

class Portfolio extends Model{
  static async itemsList(){
    return this.findAll({
      attributes: [
        'key','name','type','customer','device',
      ],
      where: {
        active: true
      }

    })
  }

  static async page(_id){
    return this.findOne({
      attributes:[
        'key',
        'type',
        'name',
        'customer',
        'device',
        'url',
        'specs',
        'description',
      ],
      where: {
        key: _id,
        active: true,
      }
    })
  }
  static beautify( values ){
    const newArray = [];
    const self = this;

    if (Array.isArray(values)) {
        values.forEach(value => {
        if(value instanceof self){
          newArray.push( value.dataValues )
        }
      });
      return newArray;
    } else{
      if(values instanceof self) return values.dataValues;
    }
    return values;
  }
}


Portfolio.init({
  portfolio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  device: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specs: {
    type: DataTypes.STRING,
    set(value){
      // const rawValue = JSON.stringify(value);
      const rawValue = serialize(value);
      this.setDataValue('specs',rawValue)
    }
  },
  features: {
    type: DataTypes.VIRTUAL,
    get(){
      const rawValue = this.getDataValue('specs');
      return rawValue ? unserialize(rawValue):[];
      // return rawValue ? JSON.parse(rawValue):[];
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
},
{
  sequelize,
  modelName: 'portfolio',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});


module.exports = Portfolio;
