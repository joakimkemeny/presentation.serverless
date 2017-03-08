import AWSMqtt from "aws-mqtt-client"
import React from "react"
import { inject, observer } from "mobx-react"
import "./DroidDetails.css"
import Map from "../map"
import Button from "../button"

@inject("droidStore") @observer
export default class DroidDetails extends React.Component {

	constructor() {
		super()
		this.direction = 0
		this.speed = 0
		this.x = -1
		this.y = -1
	}

	color = (color) => {
		const { match } = this.props
		const droidId = match.params.droidId
		this.props.droidStore.color(droidId, color)
	}

	move = (newDirection) => {
		const { match } = this.props
		const droidId = match.params.droidId

		let newSpeed = this.speed + 50
		if (newDirection !== this.direction) {
			newSpeed = 50
		}
		this.direction = newDirection
		this.speed = newSpeed

		this.props.droidStore.move(droidId, newDirection, newSpeed)
	}

	stop = () => {
		const { match } = this.props
		const droidId = match.params.droidId

		this.props.droidStore.stop(droidId)
	}

	componentWillMount() {
		const { droidStore } = this.props

		const mqttClient = new AWSMqtt({
			accessKeyId: 'AKIAJN6JYLL4MJPTCCPA',
			secretAccessKey: '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',
			endpointAddress: 'axl1uxnehfk9n.iot.eu-west-1.amazonaws.com',
			region: 'eu-west-1'
		});

		mqttClient.on('connect', () => {
			mqttClient.subscribe('$aws/things/BB-8/shadow/update/accepted');
			console.log('connected to iot mqtt websocket');
		});
		mqttClient.on('message', (topic, message) => {
			const m = JSON.parse(message.toString())
			if (m.state.reported) {
				const state = m.state.reported
				const parts = topic.split("/")

				const droid = droidStore.droids.find(droid => droid.name === parts[2])
				droidStore.updateDroidFromJson({ id: droid.id, ...state })
			}
		});
	}

	render() {
		const { droidStore, match } = this.props

		const droidId = match.params.droidId
		const droid = droidStore.droids.find(droid => droid.id === droidId)

		const style = {
			backgroundColor: "red",
			marginLeft: 10,
			minWidth: 40,
			padding: 0,
			width: 40
		}

		return (
			<div className="droidDetails">
				<h3>
					Speed: <b>{(droid && droid.velocity) || "-"} cm/s</b>,
					Position: <b>{(droid && droid.x) || "-"}, {(droid && droid.y) || "-"}</b>
				</h3>

				<Map droid={droid} />

				<div style={{ float: "right" }}>
					<div style={{ marginBottom: 20 }}>
						<Button onClick={this.color.bind(this, "black")} style={{
							...style, backgroundColor: "black"
						}}>&nbsp;</Button>
						<Button onClick={this.color.bind(this, "lime")} style={{
							...style, backgroundColor: "lime"
						}}>&nbsp;</Button>
						<Button onClick={this.color.bind(this, "aqua")} style={{
							...style, backgroundColor: "aqua"
						}}>&nbsp;</Button>
						<Button onClick={this.color.bind(this, "yellow")} style={{
							...style, backgroundColor: "yellow"
						}}>&nbsp;</Button>
						<Button onClick={this.color.bind(this, "fuchsia")} style={{
							...style, backgroundColor: "fuchsia"
						}}>&nbsp;</Button>
					</div>
					<div style={{
						position: "relative",
						width: 124,
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: 30
					}}>
						<Button className="up" onClick={this.move.bind(this, 0)}>&nbsp;</Button>
						<Button className="right" onClick={this.move.bind(this, 90)}>&nbsp;</Button>
						<Button className="down" onClick={this.move.bind(this, 180)}>&nbsp;</Button>
						<Button className="left" onClick={this.move.bind(this, 270)}>&nbsp;</Button>
						<Button className="stop" onClick={this.stop}>&nbsp;</Button>
					</div>
				</div>
			</div>
		)
	}
}
