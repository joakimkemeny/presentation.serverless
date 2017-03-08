import React from "react"
import { inject, observer } from "mobx-react"
import { Link } from "react-router-dom"
import "./DroidItem.css"
import Button from "../button"

@inject("droidStore") @observer
export default class DroidItem extends React.Component {

	render() {
		const { droid, droidStore } = this.props
		return (
			<div className="droidItem">
				<img alt={droid.name} src={`/images/droids/${droid.image}.jpg`} />
				<h3><Link to={`/droid/${droid.id}`}>{droid.name}</Link></h3>
				<h4>{droid.id}</h4>
				<p>{droid.description}</p>
				<p>
					<Button onClick={droidStore.deleteDroid.bind(null, droid)}>
						Remove
					</Button>
				</p>
				{this.props.children}
			</div>
		)
	}
}
