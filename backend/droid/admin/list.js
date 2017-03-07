const droidDao = require("./dao/droid-dao")

module.exports.list = (event, context, callback) => {
	droidDao.findAll()
		.then(droids => {
			const response = {
				statusCode: 200,
				headers: { "Access-Control-Allow-Origin": "*" },
				body: JSON.stringify(droids)
			}
			callback(null, response)
		})
}
