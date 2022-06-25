const Path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./api/v1');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const serverless = require('serverless-http');

// BODY PARSER
app.use(express.json({ limit: 104857600 }));

// CORS
app.use(cors());

// Opciones para la visualizacion del swagger
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Documentación API',
			version: '1.0.0',
			description: 'Reto Técnico - Serverless',
		},
		servers: [
			{
				url: '${URL}/api/v1', //Ingresar la ruta en URL, ejemplo: https://example.execute-api.us-east-1.amazonaws.com
			},
		],
	},
	apis: [Path.join(__dirname + '/config/swagger-spec.yml')],
};

// Interpretar la configuracion .yml del swagger
const specs = swaggerJsDoc(options);

// Ruta para la documentacion swagger
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs));

// PREFIX AND ROUTES
app.use('/api/v1', routes);

// Framework Serverless
module.exports.handler = serverless(app);
