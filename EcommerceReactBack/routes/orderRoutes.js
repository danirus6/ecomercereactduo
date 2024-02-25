const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authentication } = require("../middlewares/authentication.js");

//Crea un endpoint para crear pedidos
router.post("/", authentication, OrderController.create);

//Crea un endpoint para ver los pedidos junto a los productos que tienen

router.get("/", OrderController.getAll);

module.exports = router;