const OrderController = require("../controllers/order");
const router = require("express").Router();

router.post("/",OrderController.addOrder);
router.get("/",OrderController.getAllOrder);
router.get("/:id",OrderController.getOrder);
router.put("/:id",OrderController.updateOrder);
router.get("/user/:id",OrderController.getOrderByUser);
router.get("/revenue/:id",OrderController.getOrderRevenue);



module.exports = router