const mongoose = require("mongoose");
const goodsShema = new mongoose.Schema({

    name:{
        type : String,
        require: true
    },
    quantity:{
        type : Number,
        require: true
    },
    unit:{
        type : String,
        require: true
    },
    isDelete :{
        type:Boolean,
        default:false
    }
})

let Goods = mongoose.model("Goods", goodsShema);
module.exports = { Goods };
