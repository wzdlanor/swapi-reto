const express = require('express');
const dev = require('./routes/dev.route');
const swapi = require('./routes/swapi.route');

const routes = express.Router();

routes.use('/dev', dev);
routes.use('/swapi', swapi);

module.exports = routes;
