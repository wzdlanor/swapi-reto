const { sendSuccess, sendError } = require('../helpers/send.helper');
const config = require('../../../config/config');
const axios = require('axios');

module.exports = {
	listPersonas: async (req, res) => {
		let arrPersonas = [];
		try {
			const personas = await axios.get(`${config.link}/people/`);

			if (!personas.hasOwnProperty('data')) {
				return res
					.status(404)
					.json(await sendError('Error en la consulta.', [], 404));
			}

			await personas.data.results.forEach((item) => {
				arrPersonas.push({
					nombre: item.name,
					estatura: item.height,
					peso: item.mass,
					color_cabello: item.hair_color,
					color_piel: item.skin_color,
					color_ojos: item.eye_color,
					anio_nacimiento: item.birth_year,
					sexo: item.gender,
					mundo_natal: item.homeworld,
					peliculas: item.films,
					especies: item.species,
					vehiculos: item.vehicles,
					naves: item.starships,
					creado: item.created,
					editado: item.edited,
					enlace: item.url,
				});
			});

			return res
				.status(200)
				.json(await sendSuccess('Consulta Exitosa.', arrPersonas, [], 200));
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	showPersona: async (req, res) => {
		const id = req.params.id;
		let objPersona = {};
		try {
			const persona = await axios
				.get(`${config.link}/people/${id}`)
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					return error;
				});

			if (!persona.hasOwnProperty('data')) {
				return res
					.status(404)
					.json(await sendError('La Persona no existe.', [], 404));
			}

			objPersona = {
				nombre: persona.data.name,
				estatura: persona.data.height,
				peso: persona.data.mass,
				color_cabello: persona.data.hair_color,
				color_piel: persona.data.skin_color,
				color_ojos: persona.data.eye_color,
				anio_nacimiento: persona.data.birth_year,
				sexo: persona.data.gender,
				mundo_natal: persona.data.homeworld,
				peliculas: persona.data.films,
				especies: persona.data.species,
				vehiculos: persona.data.vehicles,
				naves: persona.data.starships,
				creado: persona.data.created,
				editado: persona.data.edited,
				enlace: persona.data.url,
			};

			return res
				.status(200)
				.json(await sendSuccess('Consulta Exitosa.', objPersona, [], 200));
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	listPeliculas: async (req, res) => {
		let arrPeliculas = [];
		try {
			const peliculas = await axios.get(`${config.link}/films/`);

			if (!peliculas.hasOwnProperty('data')) {
				return res
					.status(404)
					.json(await sendError('Error en la consulta.', [], 404));
			}

			await peliculas.data.results.forEach((item) => {
				arrPeliculas.push({
					id_episodio: item.episode_id,
					titulo: item.title,
					apertura: item.opening_crawl,
					director: item.director,
					productor: item.producer,
					estreno: item.release_date,
					personajes: item.characters,
					planetas: item.planets,
					naves: item.starships,
					vehiculos: item.vehicles,
					especies: item.species,
					creado: item.created,
					editado: item.edited,
					enlace: item.url,
				});
			});

			return res
				.status(200)
				.json(await sendSuccess('Consulta Exitosa.', arrPeliculas, [], 200));
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	showPelicula: async (req, res) => {
		const id = req.params.id;
		let objPelicula = {};
		try {
			const pelicula = await axios
				.get(`${config.link}/films/${id}`)
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					return error;
				});

			if (!pelicula.hasOwnProperty('data')) {
				return res
					.status(404)
					.json(await sendError('La Pelicula no existe.', [], 404));
			}

			objPelicula = {
				id_episodio: pelicula.data.episode_id,
				titulo: pelicula.data.title,
				apertura: pelicula.data.opening_crawl,
				director: pelicula.data.director,
				productor: pelicula.data.producer,
				estreno: pelicula.data.release_date,
				personajes: pelicula.data.characters,
				planetas: pelicula.data.planets,
				naves: pelicula.data.starships,
				vehiculos: pelicula.data.vehicles,
				especies: pelicula.data.species,
				creado: pelicula.data.created,
				editado: pelicula.data.edited,
				enlace: pelicula.data.url,
			};

			return res
				.status(200)
				.json(await sendSuccess('Consulta Exitosa.', objPelicula, [], 200));
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	listPlanetas: async (req, res) => {
		let arrPlanetas = [];
		try {
			const planetas = await axios.get(`${config.link}/planets/`);

			if (!planetas.hasOwnProperty('data')) {
				return res
					.status(404)
					.json(await sendError('Error en la consulta.', [], 404));
			}

			await planetas.data.results.forEach((item) => {
				arrPlanetas.push({
					nombre: item.name,
					periodo_rotacion: item.rotation_period,
					periodo_orbital: item.orbital_period,
					diametro: item.diameter,
					clima: item.climate,
					gravedad: item.gravity,
					terreno: item.terrain,
					agua_superficie: item.surface_water,
					poblacion: item.population,
					residentes: item.residents,
					peliculas: item.films,
					creado: item.created,
					editado: item.edited,
					enlace: item.url,
				});
			});

			return res
				.status(200)
				.json(await sendSuccess('Consulta Exitosa.', arrPlanetas, [], 200));
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
	showPlaneta: async (req, res) => {
		const id = req.params.id;
		let objPlaneta = {};
		try {
			const planeta = await axios
				.get(`${config.link}/planets/${id}`)
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					return error;
				});

			if (!planeta.hasOwnProperty('data')) {
				return res
					.status(404)
					.json(await sendError('El Planeta no existe.', [], 404));
			}

			objPlaneta = {
				nombre: planeta.data.name,
				periodo_rotacion: planeta.data.rotation_period,
				periodo_orbital: planeta.data.orbital_period,
				diametro: planeta.data.diameter,
				clima: planeta.data.climate,
				gravedad: planeta.data.gravity,
				terreno: planeta.data.terrain,
				agua_superficie: planeta.data.surface_water,
				poblacion: planeta.data.population,
				residentes: planeta.data.residents,
				peliculas: planeta.data.films,
				creado: planeta.data.created,
				editado: planeta.data.edited,
				enlace: planeta.data.url,
			};

			return res
				.status(200)
				.json(await sendSuccess('Consulta Exitosa.', objPlaneta, [], 200));
		} catch (err) {
			console.error('[ERROR] ', err);
			return res.status(400).json(await sendError('Algo ocurrio!', err, 400));
		}
	},
};
