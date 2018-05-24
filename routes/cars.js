// @flows
const express = require('express')
const Cars = require('../models/car')
const router = express.Router()

// 添加购物车
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newCar = new Cars({
      username: req.body.username,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      count: req.body.count,
      goodId: req.body.goodId
    })
    newCar.save((err) => {
      if (err) {
        return res.json({ success: false, message: '添加购物车失败!' })
      }
      res.json({ success: true, message: '添加购物车成功!' })
    })
  }
})

// 根据用户查找购物车信息
router.get('/get', (req, res) => {
  if (req.query.username) {
    Cars.find({ 'username': req.query.username }).sort({ _id: -1 }).exec().then((cars) => {
      return res.json(cars)
    })
  } else {
    res.json({ success: false, message: '未登录' })
  }
})
// 删除一条购物车
router.post('/delete', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newCar = {
      _id: req.body.carId
    }
    // 删除
    Cars.remove(newCar, (err) => {
      if (err) {
        return res.json({ success: false, message: '删除购物车失败!' })
      }
      res.json({ success: true, message: '删除购物车成功!' })
    })
  }
})
// 清空购物车
router.post('/deleteAll', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newCar = {
      username: req.body.username
    }
    // 删除
    Cars.remove(newCar, (err) => {
      if (err) {
        return res.json({ success: false, message: '清空购物车失败!' })
      }
      res.json({ success: true, message: '清空购物车成功!' })
    })
  }
})

module.exports = router
