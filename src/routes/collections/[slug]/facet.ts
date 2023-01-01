import type { PageData } from './$houdini';

type FacetValues = PageData['CollectionsPage']['search']['facetValues'];

export interface FacetWithValues {
	id: string;
	name: string;
	values: {
		id: string;
		name: string;
		selected: boolean;
	}[];
}

export function transformFacetValues(
	allFacets: FacetValues,
	currentFacets: FacetValues,
	activeFacetIds: string[],
	totalSearchItems: number
): FacetWithValues[] {
	if (!currentFacets) return [];

	const facetMap = new Map<string, FacetWithValues>();

	for (let i = 0; i < allFacets.length; i++) {
		const {
			facetValue: { id, name, facet },
			count
		} = allFacets[i];

		if (count === totalSearchItems) continue;

		const facetFromMap = facetMap.get(facet.id);
		const selected = activeFacetIds.includes(id);
		if (facetFromMap) {
			facetFromMap.values.push({ id, name, selected });
		} else {
			facetMap.set(facet.id, {
				id: facet.id,
				name: facet.name,
				values: [{ id, name, selected }]
			});
		}
	}

	return Array.from(facetMap.values());
}
