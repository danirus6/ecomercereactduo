const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const {authentication} = require('../middlewares/authentication')


router.get('/getAllUsers', authentication, UserController.findAll);
router.post('/register', UserController.create);
router.post('/login',UserController.login)
router.delete('/delete/:id', authentication, UserController.deleteUser);
router.delete('/logout', authentication, UserController.logout);
router.get('/user-info', authentication, UserController.getUserInfo);

module.exports = router;