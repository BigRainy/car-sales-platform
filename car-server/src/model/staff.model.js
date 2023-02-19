const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Staff = seq.define('cs_staff', {
  staff_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '员工工号'
  },
  staff_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '员工姓名'
  },
  staff_sex: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "员工性别"
  },
  staff_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '员工年龄'
  },
  staff_native_place: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "员工籍贯"
  },
  staff_education: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "员工学历"
  },
  staff_phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "员工手机号"
  }
}, {
  paranoid: true
})

// Staff.sync({ force: true })

module.exports = Staff
