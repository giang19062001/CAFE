const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "Đang thực hiện",
    },

    total: {
      type: Number,
      required: true,
    },
    orderDetail: {
      type:Array,
      required: true,
    },
    ingredient:{
      type:Array,
      required: true,
    }
  },
  { timestamps: true }
);



let Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
