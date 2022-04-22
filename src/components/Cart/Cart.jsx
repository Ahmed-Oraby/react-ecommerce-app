import React, { Component } from "react";
import "./Cart.css";
import plus from "../../icons/plus-square.svg";
import minus from "../../icons/minus-square.svg";

class Cart extends Component {
	render() {
		const { cartItems, handleCartAdd, handleCartRemove } = this.props;
		console.log("cart:", cartItems);
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
						</div>
						<div className="cart-item__gallery">
							<div className="cart-item__buttons">
								<img src={plus} alt="" onClick={() => handleCartAdd(item, index)} />
								<span className="cart-item__amount">{item.count}</span>
								<img
									src={minus}
									alt=""
									onClick={() => handleCartRemove(item, index)}
								/>
							</div>
							<img
								className="cart-item__image"
								src={item.product.gallery[0]}
								alt=""
							/>

							{/* <div className="cart-item__image">
								<span onClick={() => this.handleNextImage(item.product.gallery)}>
									&lt;
								</span>
								<span>&gt;</span>
							</div> */}
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default Cart;
