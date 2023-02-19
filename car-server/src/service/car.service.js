const Car = require('../model/car.model')

class CarService {
  async createCar(car) {
    const res = await Car.create(car)
    return res.dataValues
  }

  async updateCar(car_id, car) {
    const res = await Car.update(car, { where: { car_id } })
    return res[0] > 0 ? true : false
  }

  async removeCar(car_id) {
    const res = await Car.destroy({ where: { car_id } })
    return res > 0 ? true : false
  }

  async restoreCar(car_id) {
    const res = await Car.restore({ where: { car_id } })
    return res > 0 ? true : false
  }

  async findCar(pageNum, pageSize) {
    // 1.获取总数
    // const count=await Car.count()
    // console.log(count)
    // 2.获取分页的具体数据
    // const offset=(pageNum-1)*pageSize
    // const rows=await Car.findAll({offset:offset,limit:pageSize*1})

    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Car.findAndCountAll({
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
  // 根据手机号查找用户信息
  async findOneCar(car_id) {
    const res = await Car.findOne({ where: { car_id } })
    return res.dataValues
  }

}

module.exports = new CarService()