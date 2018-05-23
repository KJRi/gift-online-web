// @flows
const express = require('express')
const Orders = require('../models/order')
const router = express.Router()

// 添加订单
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newOrder = new Orders({
      username: req.body.username,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      count: req.body.count,
      goodId: req.body.goodId,
      address: {
        name: req.body.name,
        phoneNum: req.body.phoneNum,
        location: req.body.location,
        detail: req.body.detail
      }
    })
    newOrder.save((err) => {
      if (err) {
        return res.json({ success: false, message: '购买失败!' })
      }
      res.json({ success: true, message: '购买成功!' })
    })
  }
})

// 根据用户查找订单信息
router.get('/get', (req, res) => {
  if (req.query.username) {
    Orders.find({ 'username': req.query.username }).sort({ _id: -1 }).exec().then((cars) => {
      return res.json(cars)
    })
  } else {
    res.json({ success: false, message: '未登录' })
  }
})

module.exports = router
