const { DataTypes } = require('sequelize')

const seq = require('../db/seq')
const Car = seq.define('cs_car', {
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '汽车编号'
  },
  car_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '汽车型号'
  },
  car_color: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '汽车颜色'
  },
  car_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '汽车价格'
  },
  car_image: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '汽车图片的URL'
  },
  car_manufacturer: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '生产厂家'
  },
  car_produce_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '生产日期'
  },
  car_info: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '汽车介绍'
  }
}, {
  paranoid: true
})

// 创建好后注释掉
// Car.sync({ force: true })

module.exports = Car
