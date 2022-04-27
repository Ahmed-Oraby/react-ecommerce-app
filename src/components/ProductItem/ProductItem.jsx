import React, { Component } from "react";
import { Link } from "react-router-dom";
import cart from "../../icons/cart-white.svg";
import "./ProductItem.css";

class ProductItem extends Component {
	productInCart = (cartItems, productId) => {
		for (let item of cartItems) {
			if (item.product.id === productId) return true;
		}
	};

	render() {
		const { productDetails, cartItems } = this.props;
		const inCart = this.productInCart(cartItems, productDetails.id);

		return (
			<div className={inCart ? "product in-cart" : "product"}>
				<Link to={`/product/${productDetails.id}`}>
					<div className={productDetails.inStock ? "" : "out-stock"}>
						<img
							className="product__image"
							src={productDetails.gallery[0]}
							alt={productDetails.name}
						/>
					</div>
				</Link>

				{inCart ? (
					<div className="product__cart-icon">
						<img src={cart} alt="" />
					</div>
				) : null}

				<h2 className="product__title">{productDetails.name}</h2>
				<p className="product__price">
					{productDetails.prices[0].currency.symbol + productDetails.prices[0].amount}
				</p>
			</div>
		);
	}
}

export default ProductItem;
