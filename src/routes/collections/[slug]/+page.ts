import { error } from '@sveltejs/kit';
import { graphql } from '$houdini';

import type { AfterLoadEvent, PageLoadEvent } from './$houdini';

export const _houdini_load = graphql(`
	query CollectionsPage($slug: String!, $input: SearchInput!) {
		collection(slug: $slug) {
			id
			name
			slug
			breadcrumbs {
				id
				name
				slug
			}
			children {
				id
				name
				slug
				featuredAsset {
					id
					preview
				}
			}
		}

		search(input: $input) {
			totalItems
			items {
				...ListedProduct
			}
			facetValues {
				count
				facetValue {
					id
					name
					facet {
						id
						name
					}
				}
			}
		}
	}
`);

export function _CollectionsPageVariables({ params }: PageLoadEvent) {
	return {
		slug: params.slug,
		input: {
			collectionSlug: params.slug,
			groupByProduct: true
		}
	};
}

export function _houdini_afterLoad({ data }: AfterLoadEvent) {
	const { collection, search } = data.CollectionsPage;

	if (!collection || !search) throw error(404, { message: 'Collection not found' });

	return data;
}
