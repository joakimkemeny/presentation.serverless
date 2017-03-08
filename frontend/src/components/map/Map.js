import React from "react"
import "./Map.css"

export default class Map extends React.Component {

	componentDidMount() {
		const { droid } = this.props
		this.updateCanvas(droid)
	}

	componentWillReceiveProps(nextProps) {
		const { droid } = nextProps
		this.updateCanvas(droid)
	}

	normalize(x, y) {
		const deltaX = this.startX === undefined || isNaN(this.startX) ? 0 : this.startX - 200
		const deltaY = this.startY === undefined || isNaN(this.startY) ? 0 : this.startY - 150

		const newX = Math.floor(x * 10 * 200 / Math.pow(8, 5)) + 200 - deltaX
		const newY = Math.floor(y * 10 * 150 / Math.pow(8, 5)) + 150 - deltaY

		return { newX: newX , newY: newY }
	}

	updateCanvas(droid) {
		const ctx = this.refs.canvas.getContext("2d")
		if (droid) {
			if (this.x !== undefined && this.startX !== undefined) {
				const { newX : startX, newY : startY } = this.normalize(this.x, this.y)
				const { newX : endX, newY : endY } = this.normalize(droid.x, droid.y)
				ctx.beginPath()
				ctx.moveTo(startX, startY)
				ctx.lineTo(endX, endY)
				ctx.lineWidth = 5
				ctx.strokeStyle = droid.color || "black"
				ctx.stroke()
			} else {
				const { newX, newY } = this.normalize(droid.x, droid.y)
				this.startX = newX
				this.startY = newY
			}
			this.x = droid.x
			this.y = droid.y
		}
	}

	render() {
		return <canvas className="map" ref="canvas" width="400" height="300" />
	}
}
