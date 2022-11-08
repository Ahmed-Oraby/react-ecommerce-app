import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import CategoryListing from './components/CategoryListing/CategoryListing';
import ProductDescription from './components/ProductDescription/ProductDescription';
import Cart from './components/Cart/Cart';
import CartOverlay from './components/CartOverlay/CartOverlay';
import CurrencySelector from './components/CurrencySelector/CurrencySelector';
import { CurrencyContext, currency } from './currency-context';

class App extends Component {
	state = {
		serverData: null,
		currentCategory: 'all',
		currentCurrency: currency[0], //set intial currency to USD
		cartItems: [], //an array for holding all the items in cart
		attributesAlert: null, //a flag for setting an alert if attributes are not selected
	};

	requestServerData() {
		fetch(
			`https://graphql-endpoint.onrender.com/graphql?query={
				categories{
					name,
					products{
						id,
						name,
						gallery,
						inStock,
						prices{
							amount,
							currency{
								label,
								symbol
							}
						}
					}
				}
			}`
		)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ serverData: data.data });
			});
	}

	handleCurrency = (currencyLabel) => {
		let currencyType = currency.filter((item) => item.label === currencyLabel);
		localStorage.setItem('ecommerceApp_currency', JSON.stringify(currencyType[0]));
		this.setState({ currentCurrency: currencyType[0] });
	};

	handleCategory = (categoryName) => {
		this.setState({ currentCategory: categoryName, attributesAlert: null });
	};

	handleCartAdd = (productItem, attributesArray) => {
		const product = { ...productItem };
		const attributes = [...attributesArray];

		//make sure all attributes are selected
		if (product.attributes.length !== attributes.length) {
			this.setState({ attributesAlert: product.id });
			return;
		}

		let prevCartItems = [...this.state.cartItems];
		let cartItems = prevCartItems.filter((item) => product.id !== item.product.id);
		let productInCart = prevCartItems.filter((item) => product.id === item.product.id);
		let productWithSameAttr = [];
		let productWithDiffAttr = [];

		for (let product of productInCart) {
			let attrCheck = product.attributes.every(
				(attr, index) =>
					attr.attributeName === attributes[index].attributeName &&
					attr.itemId === attributes[index].itemId
			);
			if (attrCheck) productWithSameAttr.push(product);
			else productWithDiffAttr.push(product);
		}

		if (productInCart.length === 0) {
			cartItems.unshift({ product, attributes, count: 1 });
		} else if (productWithSameAttr.length) {
			productWithSameAttr[0].count++;
			cartItems.unshift(productWithSameAttr[0]);
			if (productWithDiffAttr.length) cartItems.unshift(...productWithDiffAttr);
		} else if (productWithDiffAttr.length)
			cartItems.unshift({ product, attributes, count: 1 }, ...productWithDiffAttr);

		console.log('cart items:', cartItems);
		localStorage.setItem('ecommerceApp_cartItems', JSON.stringify(cartItems));
		this.setState({ cartItems, attributesAlert: null });
	};

	handleCartIncrement = (index) => {
		let cartItems = [...this.state.cartItems];
		cartItems[index].count++;
		localStorage.setItem('ecommerceApp_cartItems', JSON.stringify(cartItems));
		this.setState({ cartItems });
	};

	handleCartDecrement = (index) => {
		let cartItems = [...this.state.cartItems];
		if (cartItems[index].count > 1) cartItems[index].count--;
		else cartItems.splice(index, 1);
		localStorage.setItem('ecommerceApp_cartItems', JSON.stringify(cartItems));
		this.setState({ cartItems });
	};

	handleCartGallery = (index, direction = true) => {
		let cartItems = [...this.state.cartItems];
		let imageGallery = [...cartItems[index].product.gallery];

		if (direction) {
			let img = imageGallery.shift();
			imageGallery.push(img);
		} else {
			let img = imageGallery.pop();
			imageGallery.unshift(img);
		}

		cartItems[index].product.gallery = imageGallery;
		this.setState({ cartItems });
	};

	componentDidMount() {
		this.requestServerData();
		let cartItems = JSON.parse(localStorage.getItem('ecommerceApp_cartItems'));
		let currency = JSON.parse(localStorage.getItem('ecommerceApp_currency'));
		if (cartItems) this.setState({ cartItems });
		if (currency) this.setState({ currentCurrency: currency });
	}

	render() {
		const { serverData, currentCategory, cartItems, attributesAlert } = this.state;

		if (serverData === null) return null;

		return (
			<CurrencyContext.Provider value={this.state.currentCurrency}>
				<NavBar
					categories={serverData.categories}
					currentCategory={currentCategory}
					handleCategory={this.handleCategory}
				>
					<CurrencySelector handleCurrency={this.handleCurrency} />
					<CartOverlay
						cartItems={cartItems}
						handleCartIncrement={this.handleCartIncrement}
						handleCartDecrement={this.handleCartDecrement}
					/>
				</NavBar>
				<Switch>
					<Route path="/product/:productId">
						<ProductDescription
							attributesAlert={attributesAlert}
							handleCartAdd={this.handleCartAdd}
						/>
					</Route>
					<Route path="/cart">
						<Cart
							cartItems={cartItems}
							handleCartIncrement={this.handleCartIncrement}
							handleCartDecrement={this.handleCartDecrement}
							handleCartGallery={this.handleCartGallery}
						/>
					</Route>
					<Route path="/">
						{serverData.categories.map((category) =>
							currentCategory === category.name ? (
								<CategoryListing
									key={category.name}
									categoryName={currentCategory}
									products={category.products}
									cartItems={cartItems}
								/>
							) : null
						)}
					</Route>
				</Switch>
			</CurrencyContext.Provider>
		);
	}
}

export default App;
