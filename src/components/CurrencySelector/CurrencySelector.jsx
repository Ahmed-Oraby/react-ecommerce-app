import React, { Component } from "react";
import downArrow from "../../icons/down-arrow.svg";
import upArrow from "../../icons/up-arrow.svg";
import "./CurrencySelector.css";
import { CurrencyContext, currency } from "../../currency-context";

class CurrencySelector extends Component {
	state = {
		menuVisible: false,
	};

	static contextType = CurrencyContext;

	handleMenuActive = () => {
		this.setState((prevState) => ({ menuVisible: !prevState.menuVisible }));
	};

	render() {
		const { menuVisible } = this.state;
		const { handleCurrency } = this.props;
		const currencyType = this.context;

		return (
			<div className="currency">
				<div className="currency__icon" onClick={this.handleMenuActive}>
					<span>{currencyType.symbol}</span>
					<img src={menuVisible ? upArrow : downArrow} alt="" />
				</div>

				{menuVisible ? (
					<div className="currency__menu">
						<ul>
							{currency.map((item) => (
								<li
									key={item.symbol}
									className="currency__item"
									onClick={() => {
										this.setState((prevState) => ({
											menuVisible: !prevState.menuVisible,
										}));
										handleCurrency(item.label);
									}}
								>
									{item.symbol + " " + item.label}
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
		);
	}
}

export default CurrencySelector;
