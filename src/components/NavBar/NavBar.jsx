import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../icons/logo.svg";
import "./NavBar.css";

class NavBar extends Component {
	render() {
		const { categories, currentCategory, handleCategory, children } = this.props;
		return (
			<nav className="navbar">
				<ul className="navbar__menu">
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
					<Link to="/" onClick={() => handleCategory("all")}>
						<img src={logo} alt="" />
					</Link>
				</div>
				<div style={{ display: "flex" }}>{children}</div>
			</nav>
		);
	}
}

export default NavBar;
