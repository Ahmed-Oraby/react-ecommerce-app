import React, { Component } from "react";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import "./Cart.css";
import plus from "../../icons/plus-square.svg";
import minus from "../../icons/minus-square.svg";
import caretLeft from "../../icons/caret-left.svg";
import caretRight from "../../icons/caret-right.svg";
import { CurrencyContext } from "../../currency-context";

class Cart extends Component {
	static contextType = CurrencyContext;

	render() {
		const { cartItems, handleCartIncrement, handleCartDecrement, handleCartGallery } =
			this.props;

		const currencyType = this.context;
		const cartPrices = cartItems
			.map((item) => item.product.prices)
			//eslint-disable-next-line
			.map((prices) => {
				for (let price of prices) {
					if (price.currency.label === currencyType.label) return price;
				}
			});

		let tax = 0;
		let qty = 0;
		let total = 0;

		if (cartItems.length !== 0) {
			qty = cartItems.map((item) => item.count).reduce((prev, current) => prev + current);
			total = cartPrices
				.map((item, index) => item.amount * cartItems[index].count)
				.reduce((prev, current) => prev + current);
			tax = total * 0.1;
			total = total + tax;
		}

		return (
			<div className="container cart">
				<h2>Cart</h2>
				{cartItems.length ? (
					cartItems.map((item, index) => (
						<div key={index} className="cart-item">
							<div>
								<h3 className="item-brand">{item.product.brand}</h3>
								<h3 className="item-name">{item.product.name}</h3>
								<p className="item-price">
									{cartPrices[index].currency.symbol + cartPrices[index].amount}
								</p>
								<ProductAttributes
									product={item.product}
									selectedAttributes={item.attributes}
									handleAttributes={() => null}
								/>
							</div>
							<div style={{ display: "flex" }}>
								<div className="cart-item__buttons">
									<img
										src={plus}
										alt=""
										onClick={() => handleCartIncrement(index)}
									/>
									<span className="cart-item__amount">{item.count}</span>
									<img
										src={minus}
										alt=""
										onClick={() => handleCartDecrement(index)}
									/>
								</div>
								<div className="cart-item__gallery">
									<img
										className="cart-item__image"
										src={item.product.gallery[0]}
										alt=""
									/>
									<div className="cart-item__arrows">
										<div
											onClick={() => handleCartGallery(index, false)}
											className="arrow"
										>
											<img src={caretLeft} alt="" />
										</div>
										<div
											onClick={() => handleCartGallery(index, true)}
											className="arrow"
										>
											<img src={caretRight} alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="cart-empty">Your cart is empty!</p>
				)}
				{cartItems.length ? (
					<div className="cart-total">
						<p>
							Tax (10%):{" "}
							<span style={{ fontWeight: 700 }}>
								{currencyType.symbol + tax.toFixed(2)}
							</span>
						</p>
						<p>
							Qty: <span style={{ fontWeight: 700 }}>{qty}</span>
						</p>
						<p className="total">
							Total:{" "}
							<span style={{ fontWeight: 700 }}>
								{currencyType.symbol + total.toFixed(2)}
							</span>
						</p>
						<button
							disabled={!total}
							className={total ? "btn btn--green" : "btn disabled"}
						>
							Order
						</button>
					</div>
				) : null}
			</div>
		);
	}
}

export default Cart;
