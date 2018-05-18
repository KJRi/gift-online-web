// @flow
module.exports = (app) => {
  app.use('/api', require('./users')) // 在所有users路由前加/api
}
