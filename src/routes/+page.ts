import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	// Since we have already fetched GetCollections in the parent layout
	// we can just reference it here and pass it down to the page
	const { GetCollections } = await parent();

	return { GetCollections };
};
