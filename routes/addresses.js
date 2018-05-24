// @flows
const express = require('express')
const Addresses = require('../models/address')
const router = express.Router()

// 添加地址
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newAddress = {
      name: req.body.name,
      location: req.body.location,
      detail: req.body.detail,
      phoneNum: req.body.phoneNum
    }
    Addresses.update({ 'username': req.body.username },
    { $push: { 'address': newAddress } }, { upsert: true }, (err) => {
      if (err) {
        return res.json({ success: false, message: '添加失败!' })
      }
      res.json({ success: true, message: '添加成功!' })
    })
  }
})

// 根据用户查找地址信息
router.get('/get', (req, res) => {
  if (req.query.username) {
    Addresses.find({ 'username': req.query.username }).exec().then((favs) => {
      return res.json(favs)
    })
  } else {
    res.json({ success: false, message: '未登录' })
  }
})
// 删除地址
router.post('/delete', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newAddress = {
      _id: req.body.addressId
    }
    Addresses.update({ 'username': req.body.username }, { $pull: { 'address': newAddress } }, (err) => {
      if (err) {
        return res.json({ success: false, message: '删除失败!' })
      }
      res.json({ success: true, message: '删除成功!' })
    })
  }
})

module.exports = router
