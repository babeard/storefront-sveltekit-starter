import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addToCart: async (event) => {
		console.log('addToCart', event);
		// TODO: add to cart here

		return { success: true };
	}
};
