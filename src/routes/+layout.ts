import {
	loadAll,
	load_GetCollections,
	load_ActiveChannel,
	load_ActiveCustomer,
	load_ActiveOrder
} from '$houdini';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	return {
		...(await loadAll(
			// TODO: not entirely sure why this is giving a typescript error
			load_ActiveChannel({ event }),
			load_ActiveCustomer({ event }),
			load_GetCollections({ event }),
			load_ActiveOrder({ event })
		))
	};
};
