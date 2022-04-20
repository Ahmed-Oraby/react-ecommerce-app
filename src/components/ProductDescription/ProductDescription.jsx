import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import "./ProductDescription.css";

class ProductDescription extends Component {
	state = {
		serverData: null,
		currentImage: "",
		selectedAttributes: [], //an array for all the selected attributes for this product
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

	handleAttributes = (attributes) => {
		let prevAttributes = [...this.state.selectedAttributes];
		let selectedAttributes = prevAttributes.filter(
			(item) => item.attributeName !== attributes.attributeName
		);
		selectedAttributes.push(attributes);
		this.setState({ selectedAttributes });
	};

	handleImage = (image) => {
		this.setState({ currentImage: image });
	};

	componentDidMount() {
		this.requestServerData();
	}

	render() {
		const { serverData, currentImage, selectedAttributes } = this.state;
		if (serverData === null) return null;
		console.log("product id:", this.props.match.params.productId);
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
					<h2 className="brand">{serverData.product.brand}</h2>
					<h2 className="name">{serverData.product.name}</h2>
					<ProductAttributes
						attributes={serverData.product.attributes}
						handleAttributes={this.handleAttributes}
						selectedAttributes={selectedAttributes}
					/>
					<div className="price">
						<h3>Price</h3>
						<p>
							{serverData.product.prices[0].currency.symbol +
								serverData.product.prices[0].amount}
						</p>
					</div>
					<button className="cart-btn">Add To Cart</button>
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
