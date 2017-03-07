const droidDao = require("./dao/droid-dao")
const uuid = require("uuid")

module.exports.create = (event, context, callback) => {
	const data = JSON.parse(event.body)
	const timestamp = Date.now()
	const droid = {
		id: data.id || uuid.v4(),
		name: data.name,
		description: data.description,
		createdAt: timestamp,
		updatedAt: timestamp
	}
	droidDao.create(droid)
		.then(droid => {
			const response = {
				statusCode: 200,
				headers: { "Access-Control-Allow-Origin": "*" },
				body: JSON.stringify(droid)
			}
			callback(null, response)
		})
}
