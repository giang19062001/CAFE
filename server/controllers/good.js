const { Goods } = require("../models/goods");

const goodsController = {
  addGoods: async (req, res) => {
    try {
      const newGoods = new Goods(req.body);
      const saveGoods = await newGoods.save();
      res.status(200).json(saveGoods);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllGoods: async (req, res) => {
    try {
      const allGoods = await Goods.find({ isDelete: false });
      res.status(200).json(allGoods);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getGoods: async (req, res) => {
    try {
      const goods = await Goods.findById(req.params.id);
      res.status(200).json(goods);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteGoods: async (req, res) => {
    try {
      const GoodsDelete = await Goods.findByIdAndUpdate(
        { _id: req.params.id },
        { isDelete: true }
      );

      res.status(200).json("delete successfull");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateGoods: async (req, res) => {
    try {
      const goods = await Goods.findById(req.params.id);

      await goods.updateOne({ $set: req.body });

      res.status(200).json("update successfull");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = goodsController;
