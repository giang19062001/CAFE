const mongoose = require("mongoose");
const foodShema = new mongoose.Schema({
    name:{
        type : String,
        require: true
    },
    price:{
        type : Number,
        require: true
    },
    photo : {
        type : String,
        require: true
    },
    recipe :{
        type : Array,
        require: true
    },
    isDelete :{
        type:Boolean,
        default:false
    }

})

let Food = mongoose.model("Food", foodShema);
module.exports = { Food };
