const Customer = require('../model/customer.model')


class CustomerService {
  async createCustomer(customer) {
    const res = await Customer.create(customer)
    return res.dataValues
  }

  async updateCustomer(customer_id, customer) {
    const res = await Customer.update(customer, { where: { customer_id } })
    return res[0] > 0 ? true : false
  }

  async removeCustomer(customer_id) {
    const res = await Customer.destroy({ where: { customer_id } })
    return res > 0 ? true : false
  }

  async restoreCustomer(customer_id) {
    const res = await Customer.restore({ where: { customer_id } })
    return res > 0 ? true : false
  }

  async findCustomer(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Customer.findAndCountAll({
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
  async findOneCustomer(customer_id) {
    const res = await Customer.findOne({ where: { customer_id } })
    return res.dataValues
  }
}

module.exports = new CustomerService()