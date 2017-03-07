const sphero = require("sphero")

module.exports.connect = (uuid, initialColor = "white") => {
	const spheroClient = sphero(uuid)
	spheroClient.connect(() => {
		console.log("Connected to SPHERO")
		spheroClient.color(initialColor)
		spheroClient.setDataStreaming({
			m: 1,
			mask1: 0x00000000,
			mask2: 0x0D800000,
			n: 200,
			pcnt: 0
		})
	})

	const move = (speed, direction, callback) => {
		if (speed < 0) {
			speed = 0;
		} else if (speed > 255) {
			speed = 255
		}
		if (direction < 0) {
			direction = 0
		} else if (direction > 359) {
			direction = 359
		}

		console.log("move", { speed, direction })
		spheroClient.roll(speed, direction)
		if (callback) {
			callback(speed, direction)
		}
	}

	const onData = (callback) => {
		spheroClient.on("dataStreaming", (data) => {
			const xVelocity = Math.abs(data.xVelocity.value[0])
			const yVelocity = Math.abs(data.yVelocity.value[0])
			const velocity = Math.sqrt(xVelocity ^ 2 + yVelocity ^ 2)
			callback({
				pos: {
					x: data.xOdometer.value[0] * 10, // mm
					y: data.yOdometer.value[0] * 10 // mm
				},
				velocity // mm/s
			})
		})
	}

	const onPowerState = (callback) => {
		const _getPowerState = () => {
			spheroClient.getPowerState((err, data) => {
				if (!err) {
					callback({
						chargeCount: data.chargeCount,
						secondsSinceCharge: data.secondsSinceCharge,
						state: data.batteryState,
						voltage: data.batteryVoltage
					})
				}
			})
		}
		_getPowerState()
		setInterval(_getPowerState, 1000 * 60)
	}

	const setColor = (color) => {
		console.log("setting color", color)
		spheroClient.color(color)
	}

	const stop = (callback) => {
		console.log("stop")
		spheroClient.stop(callback)
	}

	return {
		move, onData, onPowerState, setColor, stop
	}
}
