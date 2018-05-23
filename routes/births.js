// @flows
const express = require('express')
const Births = require('../models/birth')
const router = express.Router()

// 添加生日
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newBirth = {
      name: req.body.name,
      birthday: req.body.birthday
    }
    Births.update({ 'username': req.body.username }, { $push: { 'people': newBirth } }, { upsert: true }, (err) => {
      if (err) {
        return res.json({ success: false, message: '添加失败!' })
      }
      res.json({ success: true, message: '添加成功!' })
    })
  }
})

// 根据用户查找信息
router.get('/get', (req, res) => {
  if (req.query.username) {
    Births.find({ 'username': req.query.username }).exec().then((favs) => {
      return res.json(favs)
    })
  } else {
    res.json({ success: false, message: '未登录' })
  }
})
// 删除生日
router.post('/delete', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newBirth = {
      _id: req.body.peopleId
    }
    Births.update({ 'username': req.body.username }, { $pull: { 'people': newBirth } }, (err) => {
      if (err) {
        return res.json({ success: false, message: '删除失败!' })
      }
      res.json({ success: true, message: '删除成功!' })
    })
  }
})

module.exports = router
