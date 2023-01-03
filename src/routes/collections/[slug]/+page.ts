import { error } from '@sveltejs/kit';
import { graphql } from '$houdini';

import type { AfterLoadEvent, PageLoadEvent } from './$houdini';

export const _houdini_load = graphql(`
	query CollectionsPage($slug: String!, $input: SearchInput!, $inputAllFacets: SearchInput!) {
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

		allFacetValues: search(input: $inputAllFacets) {
			totalItems
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

export function _CollectionsPageVariables({ url, params, depends }: PageLoadEvent) {
	// TODO: Refactor. This method seems inefficient as you have to reload the entire `CollectionsPage` query.
	depends('app:filter_fvid');

	const baseInput = {
		collectionSlug: params.slug,
		groupByProduct: true
	};

	return {
		slug: params.slug,
		inputAllFacets: baseInput,
		input: {
			...baseInput,
			facetValueIds: url.searchParams.getAll('fvid')
		}
	};
}

export function _houdini_afterLoad({ data }: AfterLoadEvent) {
	const { collection, search } = data.CollectionsPage;

	if (!collection || !search) throw error(404, { message: 'Collection not found' });

	return data;
}
