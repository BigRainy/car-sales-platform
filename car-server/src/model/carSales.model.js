const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const CarSales = seq.define('cs_carSales', {
  sale_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '销售编号'
  },
  sale_time: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '销售日期'
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
  sale_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '销售数量'
  },
  staff_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '经手人'
  }
}, {
  paranoid: true
})

// CarSales.sync({ force: true })

module.exports = CarSales