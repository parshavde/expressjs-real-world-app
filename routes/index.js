var express = require('express');
var router = express.Router();

// --- middlewares
var AuthMiddleware = require('../middleware/AuthMiddleware');

// --- controllers
var UserController = require('../controllers/UserController');
var BolController = require('../controllers/BolController');

router.post('/bol', AuthMiddleware.Authnticate, BolController.Create);
router.get('/bol', AuthMiddleware.Authnticate, BolController.List);
router.get('/bol/:id', AuthMiddleware.Authnticate, BolController.Read);
router.patch('/bol/:id', AuthMiddleware.Authnticate, BolController.Update);
router.delete('/bol/:id', AuthMiddleware.Authnticate, BolController.Delete);

router.post('/user/register', UserController.Register);
router.post('/user/login', UserController.Login);
router.post('/authnticate', UserController.Authnticate);
router.get('/user/:id', AuthMiddleware.Authnticate, UserController.GetUser);

module.exports = router;