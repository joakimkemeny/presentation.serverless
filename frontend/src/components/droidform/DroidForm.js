import React from "react"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router-dom"
import "./DroidForm.css"
import Button from "../button"

@inject("droidStore") @observer
class DroidForm extends React.Component {
	@observable nameValue = ""
	@observable descriptionValue = ""

	createDroid = () => {
		this.props.droidStore.createDroid(this.nameValue, this.descriptionValue)
		this.resetInputValues()
		this.props.history.push("/")
	}

	@action.bound
	onChangeName = (e) => {
		this.nameValue = e.target.value;
	}

	@action.bound
	onChangeDescription = (e) => {
		this.descriptionValue = e.target.value;
	}

	@action.bound
	resetInputValues = () => {
		this.nameValue = ""
		this.descriptionValue = ""
	}

	render() {
		return (
			<div className="droidForm">
				<div>
					<label>Name</label>
					<input onChange={this.onChangeName} type="text" value={this.nameValue} />
				</div>
				<div>
					<label>Description</label>
					<textarea onChange={this.onChangeDescription} rows="6" value={this.descriptionValue} />
				</div>
				<Button onClick={this.createDroid}>Add</Button>
			</div>
		)
	}
}

export default withRouter(DroidForm)
