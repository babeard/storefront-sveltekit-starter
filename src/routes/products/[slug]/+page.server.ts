import type { Actions } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	addToCart: async (event) => {
		// TODO: add to cart here

		await new Promise((resolve) => setTimeout(resolve, 1500)); // TODO: remove after done testing
		// throw error(500, 'Something went wrong trying to add this to the cart.');
		return { error: 'Something went wrong trying to add this to the cart.' };
		// return { success: true };
	}
};
