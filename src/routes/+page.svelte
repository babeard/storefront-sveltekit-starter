<script>
	import CollectionCard from '$lib/components/collections/collection-card.svelte';

	/** TODO: the following need to be replaced with real values */
	let headerImage =
		'https://readonlydemo.vendure.io/assets/preview/71/derick-david-409858-unsplash__preview.jpg';
	const collections = [
		{
			id: '2',
			name: 'Electronics',
			slug: 'electronics',
			parent: {
				name: '__root_collection__'
			},
			featuredAsset: {
				id: '16',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/5b/jakob-owens-274337-unsplash__preview.jpg'
			}
		},
		{
			id: '3',
			name: 'Computers',
			slug: 'computers',
			parent: {
				name: 'Electronics'
			},
			featuredAsset: {
				id: '5',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/9c/alexandru-acea-686569-unsplash__preview.jpg'
			}
		},
		{
			id: '6',
			name: 'Furniture',
			slug: 'furniture',
			parent: {
				name: 'Home & Garden'
			},
			featuredAsset: {
				id: '46',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/69/nathan-fertig-249917-unsplash__preview.jpg'
			}
		},
		{
			id: '9',
			name: 'Equipment',
			slug: 'equipment',
			parent: {
				name: 'Sports & Outdoor'
			},
			featuredAsset: {
				id: '23',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/4f/neonbrand-428982-unsplash__preview.jpg'
			}
		},
		{
			id: '4',
			name: 'Camera & Photo',
			slug: 'camera-photo',
			parent: {
				name: 'Electronics'
			},
			featuredAsset: {
				id: '12',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/b5/eniko-kis-663725-unsplash__preview.jpg'
			}
		},
		{
			id: '5',
			name: 'Home & Garden',
			slug: 'home-garden',
			parent: {
				name: '__root_collection__'
			},
			featuredAsset: {
				id: '47',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/3e/paul-weaver-1120584-unsplash__preview.jpg'
			}
		},
		{
			id: '7',
			name: 'Plants',
			slug: 'plants',
			parent: {
				name: 'Home & Garden'
			},
			featuredAsset: {
				id: '37',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/5b/alex-rodriguez-santibanez-200278-unsplash__preview.jpg'
			}
		},
		{
			id: '10',
			name: 'Footwear',
			slug: 'footwear',
			parent: {
				name: 'Sports & Outdoor'
			},
			featuredAsset: {
				id: '32',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/a2/thomas-serer-420833-unsplash__preview.jpg'
			}
		},
		{
			id: '8',
			name: 'Sports & Outdoor',
			slug: 'sports-outdoor',
			parent: {
				name: '__root_collection__'
			},
			featuredAsset: {
				id: '24',
				preview:
					'https://readonlydemo.vendure.io/assets/preview/96/michael-guite-571169-unsplash__preview.jpg'
			}
		}
	];
</script>

<div class="relative">
	<!-- Decorative image and overlay -->
	<div aria-hidden="true" class="absolute inset-0 overflow-hidden">
		{#if headerImage}
			<img class="absolute inset-0 w-full" src={headerImage + '?w=800'} alt="header" />
		{/if}
		<div class="absolute inset-0 bg-gradient-to-br from-zinc-400 to-black mix-blend-multiply" />
	</div>
	<div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />
	<div
		class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0"
	>
		<div class="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
			<h1
				class="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r from-yellow-600 via-red-500 to-blue-600"
			>
				Vendure SvelteKit Starter
			</h1>
		</div>

		<p class="mt-4 text-2xl text-white">
			A headless commerce storefront starter kit built with
			<a href="https://www.vendure.io" class="text-blue-300 hover:text-blue-500"> Vendure </a>
			&
			<a href="~/routes/__cart/index" class="text-red-300 hover:text-red-500"> SvelteKit </a>
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
