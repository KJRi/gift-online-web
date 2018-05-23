// @flows
const express = require('express')
const Goods = require('../models/good')
const router = express.Router()

// 读取商品信息(价格升序)
router.get('/get', (req, res) => {
  if (req.query.tag) {
    Goods.find({ 'tag': req.query.tag }).sort({ 'price': -1 }).exec().then((goods) => {
      return res.json(goods)
    })
  } else if (req.query.goodId) {
    Goods.findById(req.query.goodId).exec().then((goods) => {
      return res.json(goods)
    })
  } else if (req.query.title) {
    var reg = new RegExp(req.query.title)
    Goods.find({ 'title': reg }).sort({ 'price': -1 }).exec().then((goods) => {
      return res.json(goods)
    })
  } else {
    Goods.find({}).sort({ 'price': -1 }).exec().then((goods) => {
      return res.json(goods)
    })
  }
})
// 读取商品信息(价格降序)
router.get('/getdown', (req, res) => {
  if (req.query.tag) {
    Goods.find({ 'tag': req.query.tag }).sort({ 'price': 1 }).exec().then((goods) => {
      return res.json(goods)
    })
  } else if (req.query.goodId) {
    Goods.findById(req.query.goodId).exec().then((goods) => {
      return res.json(goods)
    })
  } else if (req.query.title) {
    var reg = new RegExp(req.query.title)
    Goods.find({ 'title': reg }).sort({ 'price': 1 }).exec().then((goods) => {
      return res.json(goods)
    })
  } else {
    Goods.find({}).sort({ 'price': 1 }).exec().then((goods) => {
      return res.json(goods)
    })
  }
})
module.exports = router
