<script lang="ts">
	import type { CollectionsPage$result } from '$houdini';

	import Price from './price.svelte';

	type SearchQuery = CollectionsPage$result['search']['items'][0];

	export let productId: SearchQuery['productId'];
	export let productAsset: SearchQuery['productAsset'];
	export let productName: SearchQuery['productName'];
	export let slug: SearchQuery['slug'];
	export let priceWithTax: SearchQuery['priceWithTax'];
	export let currencyCode: SearchQuery['currencyCode'];
</script>

<a href="/products/{slug}" data-sveltekit-preload-data="hover" data-product-id={productId}>
	<img
		class="rounded-xl flex-grow object-cover aspect-[7/8]"
		alt=""
		src={productAsset?.preview + '?w=300&h=400'}
	/>
	<div class="h-2" />
	<div class="text-sm text-gray-700">{productName}</div>
	<div class="text-sm font-medium text-gray-900">
		<Price {priceWithTax} {currencyCode} />
	</div>
</a>
