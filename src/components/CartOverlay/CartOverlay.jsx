import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import cart from "../../icons/cart.svg";
import plus from "../../icons/plus-square.svg";
import minus from "../../icons/minus-square.svg";
import "./CartOverlay.css";

class CartOverlay extends Component {
	state = {
		cartVisible: false,
	};

	handleCartActive = () => {
		let cartVisible = this.state.cartVisible;
		this.setState({ cartVisible: !cartVisible });
	};

	handleModal = (e) => {
		let modal = document.getElementById("modal");
		let viewBag = document.getElementById("view-bag");
		if (e.target === modal || e.target === viewBag) {
			this.setState({ cartVisible: false });
		}
	};

	// componentDidUpdate() {
	// 	let cartModal = document.getElementById("cart-modal");
	// 	let windowHeight = window.innerHeight;
	// 	if (cartModal !== null) {
	// 		console.log(cartModal.offsetHeight, windowHeight);
	// 		if (cartModal.offsetHeight > windowHeight * 0.7) {
	// 			cartModal.style.height = "70vh";
	// 		} else {
	// 			cartModal.style.height = "auto";
	// 		}
	// 	}
	// }

	render() {
		const { cartVisible } = this.state;
		const { cartItems, selectedAttributes, handleCartAdd, handleCartRemove, handleAttributes } =
			this.props;

		let qty = 0;
		let total = 0;
		let height = "auto";

		if (cartItems.length !== 0) {
			qty = cartItems.map((item) => item.count).reduce((prev, current) => prev + current);
			total = cartItems
				.map((item) => item.product.prices[0].amount * item.count)
				.reduce((prev, current) => prev + current)
				.toFixed(2);
			total = Number(total);
			if (cartItems.length >= 2) height = "80vh";
		}

		return (
			<div className="cart-overlay">
				<div style={{ cursor: "pointer" }} onClick={this.handleCartActive}>
					<img src={cart} alt="" />
					<div className="cart-overlay__icon">{qty}</div>
				</div>
				{cartVisible ? (
					<div id="modal" className="modal-bg" onClick={(e) => this.handleModal(e)}>
						<div id="cart-modal" className="cart-overlay__modal" style={{ height }}>
							<h2 className="cart-overlay__title">
								My Bag, <span style={{ fontWeight: 500 }}>{qty} items</span>
							</h2>

							{cartItems.map((item, index) => (
								<div key={item.product.id} className="cart-overlay__item">
									<div className="cart-overlay__header">
										<p>{item.product.brand}</p>
										<p>{item.product.name}</p>
										<p style={{ fontWeight: 500 }}>
											{item.product.prices[0].currency.symbol +
												item.product.prices[0].amount}
										</p>
										<ProductAttributes
											product={item.product}
											selectedAttributes={selectedAttributes}
											handleAttributes={handleAttributes}
											isDisabled={true}
										/>
									</div>
									<div style={{ display: "flex" }}>
										<div className="cart-overlay__gallery">
											<img
												src={plus}
												alt=""
												onClick={() => handleCartAdd(item, index)}
											/>
											<span>{item.count}</span>
											<img
												src={minus}
												alt=""
												onClick={() => handleCartRemove(item, index)}
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
										${total}
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
