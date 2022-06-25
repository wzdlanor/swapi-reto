const express = require('express');

const swapiController = require('../controllers/swapi.controller');

const routes = express.Router();

/** PERSONAS **/
routes.route('/personas').get(swapiController.listPersonas);
routes.route('/personas/:id').get(swapiController.showPersona);

/** PELICULAS **/
routes.route('/peliculas').get(swapiController.listPeliculas);
routes.route('/peliculas/:id').get(swapiController.showPelicula);

/** PLANETAS **/
routes.route('/planetas').get(swapiController.listPlanetas);
routes.route('/planetas/:id').get(swapiController.showPlaneta);

module.exports = routes;
