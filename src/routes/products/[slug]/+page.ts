import { error } from '@sveltejs/kit';
import { graphql } from '$houdini';

import type { AfterLoadEvent, PageLoadEvent } from './$houdini';

export const _houdini_load = graphql(`
	query product($slug: String, $id: ID) {
		product(slug: $slug, id: $id) {
			...DetailedProduct
		}
	}
`);

export function _productVariables({ params }: PageLoadEvent) {
	return {
		slug: params.slug
	};
}

export function _houdini_afterLoad({ data }: AfterLoadEvent) {
	const { product } = data.product;

	if (!product) throw error(404, { message: 'Product not found' });

	return data;
}
