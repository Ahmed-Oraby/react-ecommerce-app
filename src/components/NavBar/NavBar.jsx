import React, { Component } from "react";
import logo from "../../icons/logo.svg";
import { Link } from "react-router-dom";
import "./NavBar.css";

export class NavBar extends Component {
	render() {
		const { categories, currentCategory, handleCategory } = this.props;

		return (
			<nav className="container navbar">
				{/* <ul>
					{categories.map((category) => (
						<li
							className={
								category.name === currentCategory
									? "navbar__item active"
									: "navbar__item"
							}
							onClick={() => this.props.handleCategory(category.name)}
						>
							{category.name.toUpperCase()}
						</li>
					))}
				</ul> */}
				<ul>
					{categories.map((category) => (
						<li key={category.name}>
							<Link
								to="/"
								onClick={() => handleCategory(category.name)}
								className={
									category.name === currentCategory
										? "navbar__item active"
										: "navbar__item"
								}
							>
								{category.name.toUpperCase()}
							</Link>
						</li>
					))}
				</ul>
				<div className="navbar__logo">
					<Link to="/">
						<img src={logo} alt="" />
					</Link>
				</div>
			</nav>
		);
	}
}

export default NavBar;
