<script lang="ts">
	import type { PageData } from './$types';

	import CollectionCard from '$lib/components/collections/collection-card.svelte';
	import type { GetCollectionsStore } from '$houdini';

	export let data: PageData & { GetCollections: GetCollectionsStore };

	$: ({ GetCollections } = data);

	$: collections = $GetCollections.data?.collections?.items || [];

	/** TODO: the following need to be replaced with real values eventually */
	let headerImage =
		'https://readonlydemo.vendure.io/assets/preview/a2/thomas-serer-420833-unsplash__preview.jpg';
</script>

<div class="relative">
	<!-- Decorative image and overlay -->
	<div aria-hidden="true" class="absolute inset-0 overflow-hidden">
		{#if headerImage}
			<img
				class="absolute -top-1/2 right-0 bottom-0 left-0 w-full"
				src={headerImage + '?w=800'}
				alt="header"
			/>
		{/if}
		<div class="absolute inset-0 bg-gradient-to-br from-pink-400 to-zinc-900 mix-blend-multiply" />
	</div>
	<div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />
	<div
		class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0"
	>
		<div class="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
			<h1
				class="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r to-pink-600  from-indigo-600 drop-shadow-md"
			>
				Vendure SvelteKit Starter
			</h1>
		</div>

		<p class="mt-4 text-2xl text-white">
			A headless commerce storefront starter kit built with
			<a href="https://www.vendure.io" class="text-indigo-300 hover:text-indigo-500"> Vendure </a>
			&
			<a href="~/routes/__cart/index" class="text-pink-300 hover:text-pink-500"> SvelteKit </a>
		</p>
	</div>
</div>

<section aria-labelledby="category-heading" class="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8">
	<div class="px-4 sm:px-6 lg:px-8 xl:px-0">
		<h2 id="category-heading" class="text-2xl font-light tracking-tight text-gray-900">
			Shop by Category
		</h2>
	</div>

	<div class="mt-4 flow-root">
		<div class="-my-2">
			<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
				<div
					class="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8"
				>
					{#each collections as collection (collection.id)}
						<CollectionCard {collection} />
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 px-4 sm:hidden">
		<a
			href="~/routes/__cart/index#"
			class="block text-sm font-semibold text-primary-600 hover:text-primary-500"
		>
			Browse all categories
			<span aria-hidden="true"> &rarr;</span>
		</a>
	</div>
</section>
