import React from "react"
import { Link } from "react-router-dom"
import "./Button.css"

export default class Button extends React.Component {

	render() {
		if (this.props.to) {
			return (
				<Link className="button" to={this.props.to}>
					{this.props.children}
				</Link>
			)
		} else {
			return (
				<button className={"button " + this.props.className}
					onClick={this.props.onClick}
					style={this.props.style}>
					{this.props.children}
				</button>
			)
		}
	}
}
