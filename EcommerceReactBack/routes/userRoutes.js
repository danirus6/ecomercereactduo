const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const { authentication } = require("../middlewares/authentication.js");

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.post("/login", UserController.login);
router.get("/getUserOrders", authentication, UserController.getUserInfo);
router.delete("/logout", authentication, UserController.logout);
router.get("/confirm/:emailToken", UserController.confirm);

module.exports = router;