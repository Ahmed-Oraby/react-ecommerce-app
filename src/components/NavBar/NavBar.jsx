import React, { Component } from "react";
import { Link } from "react-router-dom";
// import CartOverlay from "../CartOverlay/CartOverlay";
import logo from "../../icons/logo.svg";
// import currency from "../../icons/currency.svg";
import "./NavBar.css";

class NavBar extends Component {
	render() {
		const { categories, currentCategory, handleCategory, children } = this.props;
		console.log(this.props.children);
		return (
			<nav className="navbar">
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
				<div>
					{children}
					{/* <CartOverlay /> */}
					{/* <img src={currency} alt="" /> */}
					{/* <Link to="/cart">
						<img src={cart} alt="" />
					</Link> */}
				</div>
			</nav>
		);
	}
}

export default NavBar;
