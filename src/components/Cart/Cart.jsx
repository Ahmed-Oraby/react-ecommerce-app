import React, { Component } from "react";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import "./Cart.css";
import plus from "../../icons/plus-square.svg";
import minus from "../../icons/minus-square.svg";
import caretLeft from "../../icons/caret-left.svg";
import caretRight from "../../icons/caret-right.svg";

class Cart extends Component {
	render() {
		const {
			cartItems,
			selectedAttributes,
			handleCartAdd,
			handleCartRemove,
			handleCartGallery,
			handleAttributes,
		} = this.props;

		let tax = 0;
		let qty = 0;
		let total = 0;

		if (cartItems.length !== 0) {
			tax = 15;
			qty = cartItems.map((item) => item.count).reduce((prev, current) => prev + current);
			total = cartItems
				.map((item) => item.product.prices[0].amount * item.count)
				.reduce((prev, current) => prev + current)
				.toFixed(2);
		}

		return (
			<div className="container cart">
				<h2>Cart</h2>
				{cartItems.map((item, index) => (
					<div key={item.product.id} className="cart-item">
						<div>
							<h3 className="item-brand">{item.product.brand}</h3>
							<h3 className="item-name">{item.product.name}</h3>
							<p className="item-price">
								{item.product.prices[0].currency.symbol +
									item.product.prices[0].amount}
							</p>
							<ProductAttributes
								product={item.product}
								selectedAttributes={selectedAttributes}
								handleAttributes={handleAttributes}
							/>
						</div>
						<div style={{ display: "flex" }}>
							<div className="cart-item__buttons">
								<img src={plus} alt="" onClick={() => handleCartAdd(item, index)} />
								<span className="cart-item__amount">{item.count}</span>
								<img
									src={minus}
									alt=""
									onClick={() => handleCartRemove(item, index)}
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
				))}
				<div className="cart-total">
					<p>
						Tax: <span style={{ fontWeight: 700 }}>{tax}$</span>
					</p>
					<p>
						Qty: <span style={{ fontWeight: 700 }}>{qty}</span>
					</p>
					<p className="total">
						Total: <span style={{ fontWeight: 700 }}>{total}$</span>
					</p>
					<button disabled={!total} className={total ? "btn" : "btn disabled"}>
						Order
					</button>
				</div>
			</div>
		);
	}
}

export default Cart;
