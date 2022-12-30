<script lang="ts">
	import type { PageData } from './$houdini';

	import CollectionCard from '$lib/components/collections/collection-card.svelte';
	import ProductCard from '$lib/components/product/product-card.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';

	export let data: PageData;

	$: ({ CollectionsPage } = data);

	$: collection = $CollectionsPage.data?.collection!;
	$: search = $CollectionsPage.data?.search!;

	// $: ({ collection, result, resultWithoutFacetValueFilters, facetValueIds } = data);
</script>

<div class="max-w-6xl mx-auto px-4">
	<div class="flex justify-between items-center">
		<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
			{collection.name}
		</h2>

		<!-- TODO: <FiltersButton
      filterCount={facetValueIds.length}
      onClick={() => setMobileFiltersOpen(true)}
    /> -->
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
		<!-- TODO: <FacetFilterControls
      facetFilterTracker={facetValuesTracker.current}
      mobileFiltersOpen={mobileFiltersOpen}
      setMobileFiltersOpen={setMobileFiltersOpen}
    /> -->
		<div class="sm:col-span-5 lg:col-span-4">
			<div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{#each search.items as item (item.productId)}
					<ProductCard {...item} />
				{/each}
			</div>
		</div>
	</div>
</div>
