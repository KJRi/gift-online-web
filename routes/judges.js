// @flows
const express = require('express')
const Judge = require('../models/judge')
const router = express.Router()

// 添加评论
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newJudge = new Judge({
      username: req.body.username,
      rate: req.body.rate,
      content: req.body.content,
      goodId: req.body.goodId
    })
    newJudge.save((err) => {
      if (err) {
        return res.json({ success: false, message: '评论失败!' })
      }
      res.json({ success: true, message: '评论成功!' })
    })
  }
})

// 根据商品查找评价
router.get('/get', (req, res) => {
  if (req.query.goodId) {
    Judge.find({ 'goodId': req.query.goodId }).sort({ _id: -1 }).exec().then((cars) => {
      return res.json(cars)
    })
  }
})

module.exports = router
