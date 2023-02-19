const { carFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      car_id: { type: 'number', required: true },
      car_price: { type: 'number', required: true },
    })
  } catch (err) {
    console.error(err)
    carFormatError.result = err
    return ctx.app.emit('error', carFormatError, ctx)
  }

  await next()
}

module.exports = {
  validator
}