const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authentication } = require('../middlewares/authentication')

router.post('/create', authentication, ProductController.create);
router.put('/update/:id', authentication, ProductController.update);
router.delete('/delete/:id', authentication, ProductController.delete);

router.get('/getAll', ProductController.getAll);
router.get('/id/:id', ProductController.findById);

router.get('/getAllWithCategory', ProductController.getAllWithCategory);
router.get('/getByName/:productName', ProductController.findByName)
router.get('/findByPrice/:price', ProductController.findByPrice)
router.get('/products/ordered', ProductController.getAllOrdered);
module.exports = router;