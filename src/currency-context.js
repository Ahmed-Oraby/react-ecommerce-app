import React from "react";

export const currency = [
	{ symbol: "$", label: "USD" },
	{ symbol: "£", label: "GBP" },
	{ symbol: "A$", label: "AUD" },
	{ symbol: "¥", label: "JPY" },
	{ symbol: "₽", label: "RUB" },
];

export const CurrencyContext = React.createContext(currency.USD);
