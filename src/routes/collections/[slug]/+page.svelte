<script lang="ts">
	import type { PageData } from './$houdini';

	import CollectionCard from '$lib/components/collections/collection-card.svelte';
	import ProductCard from '$lib/components/product/product-card.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import FacetFilterControls from '$lib/components/facet/facet-filter-controls.svelte';
	import { groupFacetValues } from './facet';
	import { page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';
	import FiltersButton from '$lib/components/facet/filters-button.svelte';

	const FILTER_KEY = 'fvid';

	export let data: PageData;

	let mobileFiltersOpen = false;
	let setMobileFiltersOpen = (show: boolean) => (mobileFiltersOpen = show);

	$: ({ CollectionsPage } = data);

	$: collection = $CollectionsPage.data?.collection!;
	$: search = $CollectionsPage.data?.search!;
	$: allFacets = $CollectionsPage.data?.allFacetValues!;

	$: currentFacetValues = search.facetValues;

	$: facetWithValues = groupFacetValues(
		allFacets.facetValues,
		currentFacetValues,
		$page.url.searchParams.getAll(FILTER_KEY),
		allFacets.totalItems
	);

	const handleFilterChange = async ({ detail }: CustomEvent) => {
		const { value, checked } = detail;

		if (checked) {
			$page.url.searchParams.append(FILTER_KEY, value);
		} else {
			// Remove the key=value pair from the URL
			const entries = $page.url.searchParams.getAll(FILTER_KEY);
			const keep = entries.filter((entry) => entry !== value);
			$page.url.searchParams.delete(FILTER_KEY);
			keep.forEach((entry) => $page.url.searchParams.append(FILTER_KEY, entry));
		}
		await goto($page.url, { replaceState: true, noScroll: true, keepFocus: true });
		await invalidate('app:filter_fvid'); // TODO: is this the best way?
	};
</script>

<div class="max-w-6xl mx-auto px-4">
	<div class="flex justify-between items-center">
		<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
			{collection.name}
		</h2>
		<FiltersButton filterCount={allFacets.totalItems} on:click={() => setMobileFiltersOpen(true)} />
	</div>

	<Breadcrumbs items={collection.breadcrumbs} />

	{#if collection.children?.length}
		<div class="max-w-2xl mx-auto py-16 sm:py-16 lg:max-w-none border-b mb-16">
			<h2 class="text-2xl font-light text-gray-900">Collections</h2>
			<div
				class="mt-6 grid max-w-xs sm:max-w-none mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
			>
				{#each collection.children as child (child.id)}
					<CollectionCard collection={child} />
				{/each}
			</div>
		</div>
	{/if}

	<div class="mt-6 grid sm:grid-cols-5 gap-x-4">
		<FacetFilterControls
			{facetWithValues}
			{mobileFiltersOpen}
			on:close={() => setMobileFiltersOpen(false)}
			on:change={handleFilterChange}
		/>
		<div class="sm:col-span-5 lg:col-span-4">
			<div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{#each search.items as item (item.productId)}
					<ProductCard {...item} />
				{/each}
			</div>
		</div>
	</div>
</div>
