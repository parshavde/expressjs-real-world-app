var express = require('express');
var router = express.Router();

// --- middlewares
var AuthMiddleware = require('../middleware/AuthMiddleware');

// --- controllers
var UserController = require('../controllers/UserController');
var CategoryController = require('../controllers/CategoryController');
var TransactionController = require('../controllers/TransactionController');
var AccountController = require('../controllers/AccountController');

router.post('/account', AuthMiddleware.Authnticate, AccountController.Create);
router.get('/account', AuthMiddleware.Authnticate, AccountController.List);
router.get('/account/:id', AuthMiddleware.Authnticate, AccountController.Read);
router.patch('/account/:id', AuthMiddleware.Authnticate, AccountController.Update);
router.delete('/account/:id', AuthMiddleware.Authnticate, AccountController.Delete);

router.post('/category', AuthMiddleware.Authnticate, CategoryController.Create);
router.get('/category', AuthMiddleware.Authnticate, CategoryController.List);
router.get('/category/:id', AuthMiddleware.Authnticate, CategoryController.Read);
router.patch('/category/:id', AuthMiddleware.Authnticate, CategoryController.Update);
router.delete('/category/:id', AuthMiddleware.Authnticate, CategoryController.Delete);

router.post('/transaction', AuthMiddleware.Authnticate, TransactionController.Create);
router.get('/transaction', AuthMiddleware.Authnticate, TransactionController.List);
router.get('/transaction/:id', AuthMiddleware.Authnticate, TransactionController.Read);
router.patch('/transaction/:id', AuthMiddleware.Authnticate, TransactionController.Update);
router.delete('/transaction/:id', AuthMiddleware.Authnticate, TransactionController.Delete);

router.post('/user/register', UserController.Register);
router.post('/user/login', UserController.Login);
router.get('/user/:id', AuthMiddleware.Authnticate, UserController.GetUser);

module.exports = router;