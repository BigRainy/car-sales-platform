const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Customer = seq.define('cs_customer', {
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '客户编号'
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '客户姓名'
  },
  customer_address: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "客户地址"
  },
  customer_phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "客户联系方式"
  },
  customer_info: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '业务联系记录'
  }
}, {
  paranoid: true
})

// Customer.sync({ force: true })

module.exports = Customer
