// @flows
const express = require('express')
const Favs = require('../models/fav')
const router = express.Router()

// 收藏
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newFavs = new Favs({
      username: req.body.username,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      goodId: req.body.goodId
    })
    newFavs.save((err) => {
      if (err) {
        return res.json({ success: false, message: '收藏失败!' })
      }
      res.json({ success: true, message: '收藏成功!' })
    })
  }
})

// 根据用户查找收藏信息
router.get('/get', (req, res) => {
  if (req.query.username) {
    Favs.find({ 'username': req.query.username }).sort({ _id: -1 }).exec().then((favs) => {
      return res.json(favs)
    })
  } else {
    res.json({ success: false, message: '未登录' })
  }
})
// 根据用户查找是否收藏
router.get('/getIs', (req, res) => {
  if (req.query.username) {
    Favs.find({ 'username': req.query.username, 'goodId': req.query.goodId }).sort({ _id: -1 }).exec().then((favs) => {
      return res.json(favs)
    })
  }
})
// 取消收藏
router.post('/delete', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newFav = {
      goodId: req.body.goodId,
      username: req.body.username
    }
    // 删除
    Favs.remove(newFav, (err) => {
      if (err) {
        return res.json({ success: false, message: '取消收藏失败!' })
      }
      res.json({ success: true, message: '取消收藏成功!' })
    })
  }
})

module.exports = router
