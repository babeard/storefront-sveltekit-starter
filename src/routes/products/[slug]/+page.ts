import type { AfterLoadEvent, GetProductDetailVariables as VariablesFunction } from './$houdini';

import { error } from '@sveltejs/kit';

export const _GetProductDetailVariables: VariablesFunction = async (event) => {
	return { slug: event.params.slug };
};

export const _houdini_afterLoad = (event: AfterLoadEvent) => {
	const { product } = event.data.GetProductDetail;
	if (!product) throw error(404, { message: 'Product not found' });
	return event.data;
};
