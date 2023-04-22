const mongoose = require("mongoose");
const userShema = new mongoose.Schema({

    fullname:{
        type : String,
        require: true
    },
    password:{
        type : String,
        require: true
    },
    phone:{
        type : Number,
        require: true
    },
    roles : {
        type: String,
        require:true
    }
})

let User = mongoose.model("User", userShema);
module.exports = { User };
