import React from "react"
import ReactDOM from "react-dom";
import { Provider } from "mobx-react"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import DroidStore from "./stores/DroidStore"

// const devEndpoint = "https://oaxy3i47f0.execute-api.eu-west-1.amazonaws.com/dev"
const prodEndpoint = "https://gym6n0izmk.execute-api.eu-west-1.amazonaws.com/prod"

ReactDOM.render(
	<Router>
		<Provider droidStore={new DroidStore(devEndpoint)}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("root")
)
