module.exports.initControls = (move, stop) => {

	process.stdin.setRawMode(true)
	process.stdin.resume()
	process.stdin.setEncoding("utf8")

	process.stdin.on("data", (key) => {
		if (key === "\u0020") { // space
			stop()
		} else if (key === "\u001B\u005B\u0041") { // up
			move(0)
		} else if (key === "\u001B\u005B\u0043") { // right
			move(90)
		} else if (key === "\u001B\u005B\u0042") { // down
			move(180)
		} else if (key === "\u001B\u005B\u0044") { // left
			move(270)
		} else if (key === "\u0003") { // ctrl+c
			process.exit()
		}
	})
}
