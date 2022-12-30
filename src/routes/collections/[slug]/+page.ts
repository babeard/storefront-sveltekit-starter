import { error } from '@sveltejs/kit';

import { graphql, type CollectionsPage$result } from '$houdini';
import type { PageLoadEvent } from './$houdini';

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

// TODO: typescript error
export function _houdini_afterLoad({ data }) {
	const { collection, search } = data.CollectionsPage as CollectionsPage$result;

	if (!collection || !search) throw error(404, { message: 'Collection not found' });

	return data as CollectionsPage$result;
}
