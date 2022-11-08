import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import './ProductDescription.css';
import { CurrencyContext } from '../../currency-context';

class ProductDescription extends Component {
	state = {
		serverData: null,
		currentImage: '',
		selectedAttributes: [],
	};

	static contextType = CurrencyContext;

	requestServerData() {
		fetch(
			`https://graphql-endpoint.onrender.com/graphql?query={
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
				let serverData = data.data;
				this.setState({ serverData, currentImage: serverData.product.gallery[0] });
			});
	}

	handleAttributes = (attributes) => {
		let prevAttributes = [...this.state.selectedAttributes];
		let selectedAttributes = [];
		let productAttributes = prevAttributes.filter(
			(item) => item.attributeName !== attributes.attributeName
		);

		if (productAttributes.length !== 0) selectedAttributes.push(...productAttributes);

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
		const { attributesAlert, handleCartAdd } = this.props;

		if (serverData === null) return null;

		const currencyType = this.context;
		const itemPrice = serverData.product.prices.filter(
			(item) => item.currency.label === currencyType.label
		);
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

				<div className={serverData.product.inStock ? '' : 'out-stock'}>
					<img className="main-image" src={currentImage} alt="" />
				</div>

				<div className="product-desc__details">
					<h2 className="item-brand">{serverData.product.brand}</h2>
					<h2 className="item-name">{serverData.product.name}</h2>
					<ProductAttributes
						product={serverData.product}
						selectedAttributes={selectedAttributes}
						handleAttributes={this.handleAttributes}
					/>
					<div className="price">
						<h3>Price</h3>
						<p className="item-price">
							{itemPrice[0].currency.symbol + itemPrice[0].amount}
						</p>
					</div>
					{attributesAlert === serverData.product.id ? (
						<div className="attributes-alert">Please, select all attributes!</div>
					) : null}
					<button
						disabled={!serverData.product.inStock}
						onClick={() => handleCartAdd(serverData.product, selectedAttributes)}
						className={serverData.product.inStock ? 'btn btn--green' : 'btn disabled'}
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
