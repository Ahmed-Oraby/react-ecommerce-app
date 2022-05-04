import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import cart from "../../icons/cart.svg";
import plus from "../../icons/plus-square.svg";
import minus from "../../icons/minus-square.svg";
import "./CartOverlay.css";
import { CurrencyContext } from "../../currency-context";

class CartOverlay extends Component {
	state = {
		cartVisible: false,
	};

	static contextType = CurrencyContext;

	handleCartActive = () => {
		this.setState((prevState) => ({ cartVisible: !prevState.cartVisible }));
	};

	handleModal = (e) => {
		let modal = document.getElementById("modal");
		if (e.target === modal) {
			this.setState({ cartVisible: false });
		}
	};

	render() {
		const { cartVisible } = this.state;
		const { cartItems, handleCartIncrement, handleCartDecrement } = this.props;

		const currencyType = this.context;
		const cartPrices = cartItems
			.map((item) => item.product.prices)
			//eslint-disable-next-line
			.map((prices) => {
				for (let price of prices) {
					if (price.currency.label === currencyType.label) return price;
				}
			});

		let qty = 0;
		let total = 0;
		let height = "auto";

		if (cartItems.length !== 0) {
			qty = cartItems.map((item) => item.count).reduce((prev, current) => prev + current);
			total = cartPrices
				.map((item, index) => item.amount * cartItems[index].count)
				.reduce((prev, current) => prev + current);
			if (cartItems.length >= 2) height = "80vh";
		}

		return (
			<div>
				<div className="cart-overlay__icon" onClick={this.handleCartActive}>
					<img src={cart} alt="" />
					<div className="cart-overlay__qty">{qty}</div>
				</div>
				{cartVisible ? (
					<>
						<div
							id="modal"
							className="modal-bg modal-bg--grey"
							onClick={this.handleModal}
						></div>
						<div className="cart-overlay">
							<div className="cart-overlay__menu" style={{ height }}>
								<h2 className="cart-overlay__title">
									My Bag, <span style={{ fontWeight: 500 }}>{qty} items</span>
								</h2>
								{cartItems.map((item, index) => (
									<div key={index} className="cart-overlay__item">
										<div className="cart-overlay__header">
											<p>{item.product.brand}</p>
											<p>{item.product.name}</p>
											<p style={{ fontWeight: 500 }}>
												{cartPrices[index].currency.symbol +
													cartPrices[index].amount}
											</p>
											<ProductAttributes
												product={item.product}
												selectedAttributes={item.attributes}
												handleAttributes={() => null}
											/>
										</div>
										<div style={{ display: "flex" }}>
											<div className="cart-overlay__gallery">
												<img
													src={plus}
													alt=""
													onClick={() => handleCartIncrement(index)}
												/>
												<span>{item.count}</span>
												<img
													src={minus}
													alt=""
													onClick={() => handleCartDecrement(index)}
												/>
											</div>
											<img
												className="cart-overlay__image"
												src={item.product.gallery[0]}
												alt=""
											/>
										</div>
									</div>
								))}
								<div>
									{cartItems.length ? (
										<div className="cart-overlay__total">
											<p>Total</p>
											<p style={{ fontFamily: "Roboto", fontWeight: 700 }}>
												{currencyType.symbol + total.toFixed(2)}
											</p>
										</div>
									) : (
										<p className="cart-overlay-empty">Your cart is empty!</p>
									)}
									<div className="cart-overlay__buttons">
										<Link to="/cart">
											<button
												className="btn btn--white"
												onClick={() =>
													this.setState({ cartVisible: false })
												}
											>
												View Bag
											</button>
										</Link>
										<button
											disabled={!total}
											className={total ? "btn btn--green" : "btn disabled"}
										>
											Check Out
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}
			</div>
		);
	}
}

export default CartOverlay;
