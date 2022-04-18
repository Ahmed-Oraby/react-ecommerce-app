import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";

export class ProductItem extends Component {
	render() {
		const { productDetails } = this.props;
		console.log(productDetails);
		return (
			<div className="product">
				<Link to={`/${productDetails.id}`}>
					<img
						className="product__image"
						src={productDetails.gallery[0]}
						alt={productDetails.name}
					/>
				</Link>
				<h2 className="product__title">{productDetails.name}</h2>
				<p className="product__price">{`${productDetails.prices[0].currency.symbol}${productDetails.prices[0].amount}`}</p>
			</div>
		);
	}
}

export default ProductItem;
