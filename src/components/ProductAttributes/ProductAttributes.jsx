import React, { Component } from "react";
import "./ProductAttributes.css";

class ProductAttributes extends Component {
	getSelectedAttribute(selectedAttributes, productId, attributeName, itemId) {
		for (let item of selectedAttributes) {
			if (
				item.productId === productId &&
				item.attributeName === attributeName &&
				item.itemId === itemId
			)
				return "active";
		}
		return "";
	}

	render() {
		const { product, selectedAttributes, handleAttributes } = this.props;

		return product.attributes.map((attribute) => (
			<div key={attribute.id} className="product-attr">
				<h3 className="product-attr__name">{attribute.name}:</h3>
				<div className="product-attr__attributes">
					{attribute.items.map((item) => (
						<div
							key={item.id}
							onClick={() =>
								handleAttributes({
									productId: product.id,
									attributeName: attribute.name,
									itemId: item.id,
									itemValue: item.value,
								})
							}
							className={`${
								attribute.type === "text" ? "option-text" : "option-swatch"
							} ${this.getSelectedAttribute(
								selectedAttributes,
								product.id,
								attribute.name,
								item.id
							)}`}
							style={
								attribute.type === "swatch" ? { backgroundColor: item.value } : {}
							}
						>
							{attribute.type === "text" ? item.value : ""}
						</div>
					))}

					{/* {attribute.type === "swatch" &&
						attribute.items.map((item) => (
							<div
								key={item.id}
								onClick={() =>
									handleAttributes({
										attributeName: attribute.name,
										itemId: item.id,
										itemValue: item.value,
									})
								}
								className={`option-swatch ${this.getActiveClass(
									selectedAttributes,
									attribute.name,
									item.id
								)}`}
								style={{ backgroundColor: item.value }}
							></div>
						))} */}
				</div>
			</div>
		));
	}
}

export default ProductAttributes;
