import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"
import Button from "../button"

export default class Header extends React.Component {

	render() {
		return (
			<header className="header">
				<nav className="wrapper">
					<Link to="/">
						<img alt="Droidless" className="logotype" src="/images/logotype/droidless.png" />
					</Link>
					<div className="menu">
						<Button to="/add">Add</Button>
						{this.props.children}
					</div>
				</nav>
			</header>
		)
	}
}
