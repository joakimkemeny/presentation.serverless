import React from "react"
import { inject, observer } from "mobx-react"
import DroidItem from "../droiditem"
import "./DroidList.css"

@inject("droidStore") @observer
export default class DroidList extends React.Component {

	componentWillMount() {
		const { droidStore } = this.props
		droidStore.loadDroids()
	}

	render() {
		const { droidStore } = this.props
		return (
			<div className="droidList">
				{ droidStore.droids.map(droid => <DroidItem droid={droid} key={droid.id} />) }
			</div>
		)
	}
}
