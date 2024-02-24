const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const ProductController = require('../controllers/productController');

router.post('/create', OrderController.create);

router.get('/getAll', OrderController.getAll);
module.exports = router;