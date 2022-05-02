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
		let viewBag = document.getElementById("view-bag");
		if (e.target === modal || e.target === viewBag) {
			this.setState({ cartVisible: false });
		}
	};

	// getItemPrice = (ProductItem) => {
	//
	// 	const itemPrice = ProductItem.product.prices.filter(
	// 		(price) => price.currency.label === currencyType.label
	// 	);
	// 	return itemPrice[0];
	// };

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
			// 	.toFixed(2);
			// total = Number(total);
			if (cartItems.length >= 2) height = "80vh";
		}

		return (
			<div className="cart-overlay">
				<div className="cart-overlay__icon" onClick={this.handleCartActive}>
					<img src={cart} alt="" />
					<div className="cart-overlay__qty">{qty}</div>
				</div>
				{cartVisible ? (
					<div id="modal" className="modal-bg" onClick={(e) => this.handleModal(e)}>
						<div id="cart-modal" className="cart-overlay__modal" style={{ height }}>
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
								<div className="cart-overlay__total">
									<p>Total</p>
									<p style={{ fontFamily: "Roboto", fontWeight: 700 }}>
										{currencyType.symbol + total.toFixed(2)}
									</p>
								</div>
								<div className="cart-overlay__buttons">
									<Link to="/cart">
										<button id="view-bag" className="btn btn--white">
											View Bag
										</button>
									</Link>
									<button className="btn btn--green">Check Out</button>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default CartOverlay;
