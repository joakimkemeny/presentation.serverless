import { computed, observable } from "mobx"

export default class Droid {
	@observable name
	@observable description
	@observable x
	@observable y
	@observable velocity
	@observable color

	constructor(id, name, description) {
		this.id = id
		this.name = name
		this.description = description
	}

	@computed get image() {
		const name = this.name.toLowerCase()
		if (name.startsWith("2-1b")) {
			return "2-1b"
		} else if (name.startsWith("bb-")) {
			return "bb-8"
		} else if (name.startsWith("r2-d2")) {
			return "r2-d2"
		} else if (name.startsWith("viper")) {
			return "viper"
		} else {
			return "unknown"
		}
	}

	@computed get json() {
		return {
			id: this.id,
			name: this.name,
			description: this.description
		}
	}

	set json(json) {
		if (json) {
			if (json.hasOwnProperty("name")) {
				this.name = json.name
			}
			if (json.hasOwnProperty("description")) {
				this.description = json.description
			}
			if (json.hasOwnProperty("pos")) {
				this.x = json.pos.x
				this.y = json.pos.y
			}
			if (json.hasOwnProperty("velocity")) {
				this.velocity = json.velocity
			}
			if (json.hasOwnProperty("color")) {
				this.color = json.color
			}
		}
	}
}
