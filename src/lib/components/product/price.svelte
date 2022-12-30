<script lang="ts">
	import type { CollectionsPage$result } from '$houdini';
	import { formatPrice } from '$lib/util/price';

	type SearchQuery = CollectionsPage$result['search']['items'][0];

	export let priceWithTax: number | SearchQuery['priceWithTax'];
	export let currencyCode: SearchQuery['currencyCode'];
</script>

{#if priceWithTax !== null && currencyCode}
	{#if typeof priceWithTax === 'number'}
		{formatPrice(priceWithTax, currencyCode)}
	{:else if 'value' in priceWithTax}
		{formatPrice(priceWithTax.value, currencyCode)}
	{:else if priceWithTax.min === priceWithTax.max}
		{formatPrice(priceWithTax.min, currencyCode)}
	{:else}
		{formatPrice(priceWithTax.min, currencyCode)} -
		{formatPrice(priceWithTax.max, currencyCode)}
	{/if}
{/if}
