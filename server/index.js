const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")


dotenv.config()

mongoose.connect(process.env.MONGODB_URL).catch(err => console.error(err.reason))


app.use(cors({origin:"*"})) 
app.use (bodyParser.json({limit:'100mb'})) 
app.use(bodyParser.urlencoded({ extended: true,limit:'100mb',parameterLimit: 100000000  }));
app.use(morgan("common"))

app.use(express.static('images')); 
//router
const foodRouter = require("./routers/food")
const orderRouter = require("./routers/order")
const userRouter = require("./routers/user")
const goodsRouter = require("./routers/goods")


//use router

app.use("/api/food",foodRouter)
app.use("/api/order",orderRouter)
app.use("/api/user",userRouter)
app.use("/api/goods",goodsRouter)




app.listen(process.env.PORT || 8000,() =>{
    console.log("server is running..." )
})
