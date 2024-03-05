const userController = require('../controllers/controller');
const route = require('express').Router();
const bodyParser = require("body-parser");

route.get('/', userController.homeController);
route.post('/form', bodyParser.urlencoded({ extended: true }), userController.userController);

module.exports = route;