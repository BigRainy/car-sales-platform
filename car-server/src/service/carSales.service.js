const CarSales = require('../model/carSales.model')

class CarSalesService {
  async createCarSales(carSales) {
    const res = await CarSales.create(carSales)
    return res.dataValues
  }

  async updateCarSales(sale_id, carSales) {
    const res = await CarSales.update(carSales, { where: { sale_id } })
    return res[0] > 0 ? true : false
  }

  async removeCarSales(sale_id) {
    const res = await CarSales.destroy({ where: { sale_id } })
    return res > 0 ? true : false
  }

  async restoreCarSales(sale_id) {
    const res = await CarSales.restore({ where: { sale_id } })
    return res > 0 ? true : false
  }

  async findCarSales(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await CarSales.findAndCountAll({

      offset: offset,
      limit: pageSize * 1,
      attributes: ['id', 'sale_id', 'sale_time', 'car_name', 'car_color', 'sale_num', 'staff_name']
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }
  async findOneCarSale(sale_id) {
    const res = await CarSales.findOne({ where: { sale_id } })
    return res.dataValues
  }
}


module.exports = new CarSalesService()