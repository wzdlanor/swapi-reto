module.exports = {
	sendSuccess: async (message, data = [], headers = [], code = 200) => {
		let response = {
			estado: 'success',
			mensaje: message,
		};

		if (data.length > 0 || (typeof data === 'object' && data !== null)) {
			response.data = data;
		}

		return response;
	},
	sendError: async (message, error = [], code = 400) => {
		let response = {
			estado: 'error',
			codigo: code,
			mensaje: message,
		};

		if (error.length > 0 || (typeof error === 'object' && error !== null)) {
			if (error.errors) {
				error.errors.forEach((el) => {
					if (el.message) {
						response['error'] = el.message;
						return;
					}
				});
			} else {
				response['error'] = error;
			}
		}

		return response;
	},
};
