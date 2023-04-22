const FoodController = require("../controllers/food");
const uploadFood = require("../middlewares/food");
const router = require("express").Router();

router.post("/",uploadFood.single('photo'),FoodController.addFood);
router.get("/",FoodController.getAllIFoods);
router.get("/:id",FoodController.getFood);
router.put("/:id",uploadFood.single('photo'),FoodController.updateFood);
router.put("/delete/:id",FoodController.deleteFood);


module.exports = router