import React, { Component } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./CategoryListing.css";

class CategoryListing extends Component {
	render() {
		const { categoryName, products, cartItems } = this.props;
		return (
			<div className="container category">
				<h1 className="category__title">{categoryName}</h1>
				<div className="category__listing">
					{products.map((product) => (
						<ProductItem
							key={product.id}
							productDetails={product}
							cartItems={cartItems}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default CategoryListing;
