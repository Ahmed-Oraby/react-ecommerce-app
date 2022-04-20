import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CategoryListing from "./components/CategoryListing/CategoryListing";
import ProductDescription from "./components/ProductDescription/ProductDescription";

class App extends Component {
	state = {
		serverData: null,
		currentCategory: "all",
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

	componentDidMount() {
		this.requestServerData();
		console.log("mounted");
	}

	render() {
		const { serverData, currentCategory } = this.state;

		console.log("rendered");
		console.log(this.state);

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
					<Route path="/:productId">
						<ProductDescription />
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
