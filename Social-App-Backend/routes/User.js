const router = require("express").Router();
const { requiredAuth } = require("../middlewares/requiredAuth");
const {
  createUser,
  loginUser,
  addRemoveFriend,
} = require("../controllers/UserController");

router.post("/login", loginUser);
router.post("/signup", createUser);
router.patch("/addRemoveFriend", requiredAuth, addRemoveFriend);

module.exports = router;
