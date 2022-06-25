const express = require('express');

const devController = require('../controllers/dev.controller');

const routes = express.Router();

//RUTAS SIN PARAMETROS
routes.route('/especies').get(devController.index).post(devController.store);

//RUTAS CON PARAMETROS
routes
	.route('/especies/:id')
	.get(devController.show)
	.put(devController.update)
	.delete(devController.destroy);

module.exports = routes;
