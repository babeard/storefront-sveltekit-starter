import { graphql } from '$houdini';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addToCart: async (event) => {
		const data = await event.request.formData();

		const variantId = data.get('variantId')?.toString();

		// TODO: get quantity from form data
		const quantity = 1;

		if (!variantId) return fail(403, { variantId: 'No variantId provided.' });

		const addToCartMutation = graphql(`
			mutation AddToCart($variantId: ID!, $quantity: Int!) {
				addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
					... on Order {
						id
						totalQuantity
						lines {
							id
							unitPriceWithTax
							quantity
							linePriceWithTax
							productVariant {
								name
							}
							featuredAsset {
								preview
							}
						}
						shippingWithTax
						totalWithTax
					}

					... on ErrorResult {
						errorCode
						message
					}
				}
			}
		`);
		try {
			return await addToCartMutation.mutate({ variantId, quantity });
		} catch (e: any) {
			return fail(500, { message: e[0].message });
		}
	}
};
