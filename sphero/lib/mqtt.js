const fs = require("fs")
const mqtt = require("mqtt")
const path = require("path")

module.exports.connect = (endpoint, thingName, initialColor = "white") => {
	const mqttClient = mqtt.connect({
		ca: fs.readFileSync(path.join(__dirname, "../cert", "root.crt")),
		port: 8883,
		protocol: "mqtts",
		hostname: endpoint,
		cert: fs.readFileSync(path.join(__dirname, "../../.cert", thingName, "certificate.pem.crt")),
		key: fs.readFileSync(path.join(__dirname, "../../.cert", thingName, "private.pem.key")),
		clientId: thingName
	})

	const _updateState = (state) => {
		mqttClient.publish(`$aws/things/${thingName}/shadow/update`, JSON.stringify({ state }))
	}

	mqttClient.on("connect", () => {
		console.log("Connected to MQTT")

		_updateState({
			desired: null,
			reported: {
				color: initialColor,
				direction: 0,
				speed: 0
			}
		})

		mqttClient.subscribe(`$aws/things/${thingName}/shadow/update/delta`)
	})

	const onMessage = (callback) => {
		mqttClient.on("message", (topic, message) => {
			const msg = JSON.parse(new Buffer(message, "base64").toString("ascii"))
			if (msg && msg.state) {
				callback(msg.state)
			}
		})
	}

	const publishDesiredState = (state) => {
		if (Object.keys(state).length) {
			_updateState({ desired: state })
		}
	}

	const publishReportedState = (state) => {
		if (Object.keys(state).length) {
			_updateState({ reported: state })
		}
	}

	return {
		onMessage,
		publishDesiredState,
		publishReportedState
	}
}
