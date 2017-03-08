import React from "react"
import { Route } from "react-router-dom"
import DroidDetails from "./components/droiddetails"
import DroidForm from "./components/droidform"
import DroidList from "./components/droidlist"
import Header from "./components/header"
import "./App.css"

export default class App extends React.Component {

	render() {
		return (
			<div>
				<Header>
					<Route path="/add" component={DroidForm} />
				</Header>
				<DroidList />

				<Route path="/droid/:droidId" component={DroidDetails} />
			</div>
		)
	}
}
