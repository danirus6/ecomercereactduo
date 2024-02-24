const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.post('/create', CategoryController.create);
router.get('/getAll', CategoryController.getAllWithProducts);
router.get('/findById/:id', CategoryController.findById);
router.get('/findbyName/:categoryName', CategoryController.findByName);

module.exports = router;