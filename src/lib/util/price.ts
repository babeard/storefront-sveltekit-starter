export const formatPrice = (price: number, currencyCode: string) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode
	}).format(price / 100);
};
