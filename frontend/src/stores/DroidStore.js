import uuid from "uuid"
import { action, observable } from "mobx"
import Droid from "./Droid"

export default class DroidStore {
	@observable droids = []

	constructor(apiEndpoint) {
		this.apiEndpoint = apiEndpoint
	}

	@action.bound
	async createDroid(name, description) {
		const droid = new Droid(uuid.v4(), name, description)
		this.droids.push(droid)
		await fetch(`${this.apiEndpoint}/droids`,
			{ method: "POST", body: JSON.stringify(droid.json) })
	}

	@action.bound
	async deleteDroid(droid) {
		this.droids.remove(droid)
		await fetch(`${this.apiEndpoint}/droids/${droid.id}`,
			{ method: "DELETE" })
	}

	@action.bound
	async loadDroids() {
		const result = await fetch(`${this.apiEndpoint}/droids`)
		const fetchedDroids = await result.json()
		fetchedDroids.forEach(json => this.updateDroidFromJson(json))
	}

	@action.bound
	async updateDroid(droid, name, description) {
		droid.name = name
		droid.description = description
		await fetch(`${this.apiEndpoint}/droids/${droid.id}`,
			{ method: "PUT", body: JSON.stringify(droid.json) })
	}

	async color(droidId, color) {
		let droid = this.droids.find(droid => droid.id === droidId)
		await fetch(`${this.apiEndpoint}/droids/color/${droid.name}`,
			{ method: "POST", body: JSON.stringify({ color }) })
	}

	async move(droidId, direction, speed) {
		let droid = this.droids.find(droid => droid.id === droidId)
		await fetch(`${this.apiEndpoint}/droids/move/${droid.name}`,
			{ method: "POST", body: JSON.stringify({ direction, speed }) })
	}

	async stop(droidId) {
		let droid = this.droids.find(droid => droid.id === droidId)
		await fetch(`${this.apiEndpoint}/droids/stop/${droid.name}`, { method: "POST" })
	}

	@action.bound
	updateDroidFromJson(json) {
		if (json) {
			let droid = this.droids.find(droid => droid.id === json.id)
			if (droid) {
				droid.json = json
			} else {
				droid = new Droid(json.id, json.name, json.description)
				this.droids.push(droid)
			}
		}
	}
}
