const UserController = require("../controllers/user");
const router = require("express").Router();

router.post("/",UserController.registerUser);
router.post("/login",UserController.loginUser);
router.get("/",UserController.getAllUsers);
router.put("/:id",UserController.updateUser);
router.get("/:id",UserController.checkUserDuplicate);




module.exports = router