const droidDao = require("./dao/droid-dao")

module.exports.update = (event, context, callback) => {
	const data = JSON.parse(event.body)
	const droid = {
		id: event.pathParameters.id,
		name: data.name,
		description: data.description,
		updatedAt: Date.now()
	}
	droidDao.update(droid)
		.then(droid => {
			const response = {
				statusCode: 200,
				headers: { "Access-Control-Allow-Origin": "*" },
				body: JSON.stringify(droid)
			}
			callback(null, response)
		})
}
