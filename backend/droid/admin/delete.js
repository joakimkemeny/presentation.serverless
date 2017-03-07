const droidDao = require("./dao/droid-dao")

module.exports.delete = (event, context, callback) => {
	droidDao.delete(event.pathParameters.id)
		.then(() => {
			const response = {
				statusCode: 200,
				headers: { "Access-Control-Allow-Origin": "*" }
			}
			callback(null, response)
		})
}
