const aws = require("aws-sdk")
const iotData = new aws.IotData({ endpoint: "axl1uxnehfk9n.iot.eu-west-1.amazonaws.com" })

module.exports.color = (event, context, callback) => {
	const data = JSON.parse(event.body)
	const params = {
		thingName: event.thingName || event.pathParameters.thingName,
		payload: JSON.stringify({
			state: {
				desired: {
					color: data.color
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
