const Staff = require('../model/staff.model')


class StaffService {
  async createStaff(staff) {
    const res = await Staff.create(staff)
    return res.dataValues
  }

  async updateStaff(staff_id, staff) {
    const res = await Staff.update(staff, { where: { staff_id } })
    return res[0] > 0 ? true : false
  }

  async removeStaff(staff_id) {
    const res = await Staff.destroy({ where: { staff_id } })
    return res > 0 ? true : false
  }

  async restoreStaff(staff_id) {
    const res = await Staff.restore({ where: { staff_id } })
    return res > 0 ? true : false
  }

  async findStaff(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Staff.findAndCountAll({
      offset: offset,
      limit: pageSize * 1
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  // 根据员工编号查找用户信息
  async findOneStaff(staff_id) {
    const res = await Staff.findOne({ where: { staff_id } })
    return res.dataValues
  }
}

module.exports = new StaffService()