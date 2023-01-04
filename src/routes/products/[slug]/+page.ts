import { error } from '@sveltejs/kit';
import { graphql } from '$houdini';

import type { AfterLoadEvent, PageLoadEvent } from './$houdini';

export const _houdini_load = graphql(`
	query product($slug: String, $id: ID) {
		product(slug: $slug, id: $id) {
			id
			name
			description
			collections {
				id
				slug
				name
				breadcrumbs {
					id
					name
					slug
				}
			}
			facetValues {
				facet {
					id
					code
					name
				}
				id
				code
				name
			}
			featuredAsset {
				id
				preview
			}
			assets {
				id
				preview
			}
			variants {
				id
				name
				priceWithTax
				currencyCode
				sku
				stockLevel
				featuredAsset {
					id
					preview
				}
			}
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
