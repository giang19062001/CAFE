const { Order } = require("../models/order");
const { Goods } = require("../models/goods");

const orderController = {
  addOrder: async (req, res) => {
    try {
      let check = false;
      let error = "";
      const ingredient = req.body.ingredient;
      const goodAll = await Goods.aggregate([
        {
          $project: {
            _id: { $toString: "$_id" },
            name: { $toString: "$name" },
            quantity: { $toInt: "$quantity" },
          },
        },
      ]);

      goodAll.forEach((element) => {
        let get = ingredient.find((ing) => ing._id === element._id);
        if (get !== undefined) {
          if (parseInt(get.quantity) > parseInt(element.quantity)) {
            check = true;
            error = error + get.name + "\n";
          }
        }
      });

      const updateGood = async (ele) => {
        let get = goodAll.find((ing) => ing._id === ele._id);
        await Goods.updateOne(
          { _id: { $eq: ele._id } },
          {
            $set: { quantity: parseInt(get.quantity) - parseInt(ele.quantity) },
          }
        );
      };
      if (check === false) {
        ingredient.forEach((element) => {
          updateGood(element);
        });

        const newOrder = new Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json("Tạo hóa đơn thành công");
      } else {
        res.status(200).json(`${error} Không đủ nguyên liệu`);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const order = await Order.find();

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOrderByUser: async (req, res) => {
    try {
      const order = await Order.find({ user: req.params.id }).populate(
        "orderDetail"
      );
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        { _id: req.params.id },
        { status: req.body.status }
      );
      const updateOrder = await Order.findById(req.params.id);
      res.status(200).json(updateOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOrderRevenue: async (req, res) => {
    try {
      const orderAll = await Order.aggregate([
        {
          $project: {
            _id: { $toString: "$_id" },
            status: { $toString: "$status" },
            total: { $toInt: "$total" },
            orderDetail : "$orderDetail",
            ingredient : "$ingredient",
            createdAt:{ $toString: "$createdAt" } ,
            updatedAt: {
              $concat: [
                {
                  $toString: {
                    $year: "$updatedAt",
                  },
                },
                "-",
                {
                  $dateToString: {
                    date: "$updatedAt",
                    format: "%m",
                  },
                },
                "-",
                {
                  $dateToString: {
                    date: "$updatedAt",
                    format: "%d",
                  },
                },
              ],
            },
          },
        },
      ]);

      console.log(orderAll);

        const orderArray = await orderAll.filter(
          (ord) => ord.status === "Đã xong" && ord.updatedAt === req.params.id
        );
   
      res.status(200).json(orderArray);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = orderController;
