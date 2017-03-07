const droidDao = require("./dao/droid-dao")

module.exports.get = (event, context, callback) => {
	droidDao.findById(event.pathParameters.id)
		.then(droid => {
			const response = {
				statusCode: 200,
				headers: { "Access-Control-Allow-Origin": "*" },
				body: JSON.stringify(droid)
			}
			callback(null, response)
		})
}
