import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import "./ProductDescription.css";

class ProductDescription extends Component {
	state = {
		serverData: null,
		currentImage: "",
	};

	requestServerData() {
		fetch(
			`http://localhost:4000/graphql?query={
				product(id:"${this.props.match.params.productId}"){
					id,
					name,
					brand,
					gallery,
					description,
					inStock,
					attributes{
						id,
						name,
						type,
						items{
						  id,
						  value,
						  displayValue
						}
					}
					prices{
						amount,
						currency{
							label,
							symbol
						}
					}
				}
			}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				let serverData = data.data;
				this.setState({ serverData, currentImage: serverData.product.gallery[0] });
			});
	}

	handleImage = (image) => {
		this.setState({ currentImage: image });
	};

	componentDidMount() {
		this.requestServerData();
	}

	render() {
		const { serverData, currentImage } = this.state;
		const { selectedAttributes, attributesAlert, handleCartAdd, handleAttributes } = this.props;
		if (serverData === null) return null;
		console.log("instock:", serverData.product.inStock);
		console.log("product desc", this.state);
		return (
			<div className="container product-desc">
				<div className="gallery">
					{serverData.product.gallery.map((image, index) => (
						<img
							onClick={() => this.handleImage(image)}
							key={index}
							className="gallery-image"
							src={image}
							alt=""
						/>
					))}
				</div>

				<div className={serverData.product.inStock ? "" : "out-stock"}>
					<img className="main-image" src={currentImage} alt="" />
				</div>

				<div className="product-desc__details">
					<h2 className="item-brand">{serverData.product.brand}</h2>
					<h2 className="item-name">{serverData.product.name}</h2>
					<ProductAttributes
						product={serverData.product}
						handleAttributes={handleAttributes}
						selectedAttributes={selectedAttributes}
						isDisabled={false}
					/>
					<div className="price">
						<h3>Price</h3>
						<p className="item-price">
							{serverData.product.prices[0].currency.symbol +
								serverData.product.prices[0].amount}
						</p>
					</div>
					{attributesAlert === serverData.product.id ? (
						<div className="attributes-alert">Please, select all options!</div>
					) : null}
					<button
						disabled={!serverData.product.inStock}
						onClick={() => handleCartAdd({ product: serverData.product })}
						className={serverData.product.inStock ? "btn btn--green" : "btn disabled"}
					>
						Add To Cart
					</button>
					<div
						className="description"
						dangerouslySetInnerHTML={{ __html: serverData.product.description }}
					></div>
				</div>
			</div>
		);
	}
}

export default withRouter(ProductDescription);
