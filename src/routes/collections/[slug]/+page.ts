import { error } from '@sveltejs/kit';

import type { AfterLoadEvent, CollectionsPageVariables as VariablesFunction } from './$houdini';

export const _CollectionsPageVariables: VariablesFunction = async (event) => {
	// TODO: Refactor. This method seems inefficient as you have to reload the entire `CollectionsPage` query.
	event.depends('app:filter_fvid');

	const baseInput = {
		collectionSlug: event.params.slug,
		groupByProduct: true
	};

	return {
		slug: event.params.slug,
		inputAllFacets: baseInput,
		input: {
			...baseInput,
			facetValueIds: event.url.searchParams.getAll('fvid')
		}
	};
};

export const _houdini_afterLoad = (event: AfterLoadEvent) => {
	const { collection, search } = event.data.CollectionsPage;

	if (!collection || !search) throw error(404, { message: 'Collection not found' });

	return event.data;
};
