import { load_GetCollections } from '$houdini';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	return {
		...(await load_GetCollections({ event }))
	};
};
