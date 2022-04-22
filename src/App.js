import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CategoryListing from "./components/CategoryListing/CategoryListing";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import Cart from "./components/Cart/Cart";

class App extends Component {
	state = {
		serverData: null,
		currentCategory: "all",
		cartItems: [], //an array for holding all the items in cart
	};

	requestServerData() {
		fetch(
			`http://localhost:4000/graphql?query={
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
				console.log(data);
				this.setState({ serverData: data.data });
			});
	}

	handleCategory = (categoryName) => {
		this.setState({ currentCategory: categoryName });
	};

	handleCartAdd = (productItem, index = 0) => {
		let prevCartItems = [...this.state.cartItems];
		let cartItems = prevCartItems.filter((item) => productItem.product.id !== item.product.id);
		let productInCart = prevCartItems.filter(
			(item) => productItem.product.id === item.product.id
		);

		if (productInCart.length === 0) productItem.count = 1;
		else productItem.count = productInCart[0].count + 1;

		cartItems.splice(index, 0, productItem);
		this.setState({ cartItems });
	};

	handleCartRemove = (productItem, index) => {
		let prevCartItems = [...this.state.cartItems];
		let cartItems = prevCartItems.filter((item) => productItem.product.id !== item.product.id);

		if (productItem.count !== 1) {
			productItem.count--;
			cartItems.splice(index, 0, productItem);
		}
		this.setState({ cartItems });
	};

	componentDidMount() {
		this.requestServerData();
	}

	render() {
		const { serverData, currentCategory, cartItems } = this.state;

		if (serverData === null) return null;

		const listingPage = serverData.categories.map((category) =>
			currentCategory === category.name ? (
				<CategoryListing
					key={category.name}
					categoryName={currentCategory}
					products={category.products}
				/>
			) : null
		);

		return (
			<>
				<NavBar
					categories={serverData.categories}
					currentCategory={currentCategory}
					handleCategory={this.handleCategory}
				/>
				<Switch>
					<Route path="/product/:productId">
						<ProductDescription handleCartAdd={this.handleCartAdd} />
					</Route>
					<Route path="/cart">
						<Cart
							cartItems={cartItems}
							handleCartAdd={this.handleCartAdd}
							handleCartRemove={this.handleCartRemove}
						/>
					</Route>
					<Route path="/">{listingPage}</Route>
				</Switch>
			</>

			/* {data.categories.map((category) =>
					currentCategory === category.name ? (
						<CategoryListing
							categoryName={currentCategory}
							products={category.products}
						/>
					) : null
				)} */
		);
	}
}

export default App;
