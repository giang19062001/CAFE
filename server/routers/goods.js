const GoodsController = require("../controllers/good");
const router = require("express").Router();

router.post("/",GoodsController.addGoods);
router.get("/",GoodsController.getAllGoods);
router.get("/:id",GoodsController.getGoods);
router.put("/:id",GoodsController.updateGoods);
router.put("/delete/:id",GoodsController.deleteGoods);


module.exports = router