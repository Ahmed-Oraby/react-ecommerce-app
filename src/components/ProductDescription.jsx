import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductDescription extends Component {
	render() {
		console.log("params:", this.props.match.params);
		return <div>ProductDescription</div>;
	}
}

export default withRouter(ProductDescription);
