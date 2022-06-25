const { sendSuccess, sendError } = require('../helpers/send.helper');
const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const SWTableReto = process.env.SW_TABLE;

module.exports = {
	index: async (req, res) => {
		const params = {
			TableName: SWTableReto,
		};

		try {
			const { Items } = await dynamoDbClient.scan(params).promise();

			if (Items) {
				return res
					.status(200)
					.json(await sendSuccess('Consulta Exitosa.', Items, [], 200));
			} else {
				return res
					.status(404)
					.json(await sendError('Error en la consulta.', [], 404));
			}
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	show: async (req, res) => {
		const id = req.params.id;

		const params = {
			TableName: SWTableReto,
			Key: {
				Id: id,
			},
		};

		try {
			const { Item } = await dynamoDbClient.get(params).promise();

			if (Item) {
				return res
					.status(200)
					.json(await sendSuccess('Consulta Exitosa.', Item, [], 200));
			} else {
				return res
					.status(404)
					.json(await sendError('El Vehiculo no existe.', [], 404));
			}
		} catch (err) {
			console.log('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	store: async (req, res) => {
		const {
			nombre,
			classificacion,
			designacion,
			estatura,
			color_piel,
			color_cabello,
			color_ojos,
			promedio_vida,
			mundo_natal,
			idioma,
		} = req.body;

		const date = new Date().toISOString();
		const id = v4();

		const params = {
			TableName: SWTableReto,
			Item: {
				Id: id,
				nombre,
				classificacion,
				designacion,
				estatura,
				color_piel,
				color_cabello,
				color_ojos,
				promedio_vida,
				mundo_natal,
				idioma,
				creado: date,
				editado: date,
			},
			ReturnValues: 'ALL_OLD',
		};

		try {
			await dynamoDbClient.put(params).promise();

			return res
				.status(201)
				.json(await sendSuccess('Registro Exitoso.', [], [], 201));
		} catch (err) {
			console.log('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	update: async (req, res) => {
		const id = req.params.id;
		const date = new Date().toISOString();

		const params = {
			TableName: SWTableReto,
			Key: {
				Id: id,
			},
			UpdateExpression:
				'SET nombre = :nombre, classificacion = :classificacion, designacion = :designacion, estatura = :estatura, color_piel = :color_piel, color_cabello = :color_cabello, color_ojos = :color_ojos, promedio_vida = :promedio_vida, mundo_natal = :mundo_natal, idioma = :idioma, editado = :editado',
			ExpressionAttributeValues: {
				':nombre': req.body.nombre,
				':classificacion': req.body.classificacion,
				':designacion': req.body.designacion,
				':estatura': req.body.estatura,
				':color_piel': req.body.color_piel,
				':color_cabello': req.body.color_cabello,
				':color_ojos': req.body.color_ojos,
				':promedio_vida': req.body.promedio_vida,
				':mundo_natal': req.body.mundo_natal,
				':idioma': req.body.idioma,
				':editado': date,
			},
			ReturnValues: 'ALL_NEW',
		};

		try {
			const { Attributes } = await dynamoDbClient.update(params).promise();

			if (Attributes) {
				return res
					.status(200)
					.json(
						await sendSuccess('Actualización Exitosa.', Attributes, [], 200)
					);
			} else {
				return res
					.status(404)
					.json(await sendError('La Especie no existe.', [], 404));
			}
		} catch (err) {
			console.log('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	destroy: async (req, res) => {
		const id = req.params.id;

		const params = {
			TableName: SWTableReto,
			Key: {
				Id: id,
			},
		};

		try {
			await dynamoDbClient.delete(params).promise();

			return res
				.status(200)
				.json(
					await sendSuccess('Especie eliminado exitosamente.', [], [], 200)
				);
		} catch (err) {
			console.log('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
};
