<script lang="ts">
	export let stockLevel: string;

	const stocks = {
		IN_STOCK: { label: 'In stock', classes: 'bg-green-100 text-green-800' },
		OUT_OF_STOCK: { label: 'Out of stock', classes: 'bg-red-100 text-red-800' },
		LOW_STOCK: { label: 'Low stock', classes: 'bg-yellow-100 text-yellow-800' }
	};

	$: active = Object.keys(stocks).includes(stockLevel)
		? stocks[stockLevel as keyof typeof stocks]
		: { label: stockLevel, classes: 'bg-gray-100 text-gray-800' };
</script>

<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium {active.classes}">
	{active.label}
</span>
