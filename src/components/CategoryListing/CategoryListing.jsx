import React, { Component } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./CategoryListing.css";

export class CategoryListing extends Component {
	render() {
		const { categoryName, products } = this.props;
		console.log(products);
		return (
			<div className="container category">
				<h1 className="category__title">{categoryName}</h1>
				<div className="category__listing">
					{products.map((product) => (
						<ProductItem key={product.id} productDetails={product} />
					))}
				</div>
			</div>
		);
	}
}

export default CategoryListing;
