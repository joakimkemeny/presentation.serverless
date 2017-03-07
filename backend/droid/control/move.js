const aws = require("aws-sdk")
const iotData = new aws.IotData({ endpoint: "axl1uxnehfk9n.iot.eu-west-1.amazonaws.com" })

module.exports.move = (event, context, callback) => {
	const data = JSON.parse(event.body)
	const params = {
		thingName: event.thingName || event.pathParameters.thingName,
		payload: JSON.stringify({
			state: {
				desired: {
					direction: data.direction,
					speed: data.speed
				}
			}
		})
	};
	iotData.updateThingShadow(params, () => {
		const response = {
			statusCode: 200,
			headers: { "Access-Control-Allow-Origin": "*" }
		}
		callback(null, response)
	})
}
