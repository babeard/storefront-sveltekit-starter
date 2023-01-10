<script lang="ts">
	import { ActiveOrderStore, CachePolicy, CurrencyCode, graphql } from '$houdini';
	import { slide } from 'svelte/transition';
	import Price from '../product/price.svelte';
	export let activeOrder: ActiveOrderStore;
	export let editable = false;

	$: order = $activeOrder.data?.activeOrder;
	$: currencyCode = order?.currencyCode || ('USD' as CurrencyCode);

	let loadingLineId = '';
	let errorLineId = '';

	/** TODO: refactor. the following mutations seems to not leverage the power of houdini. */
	const changeQuantity = async (lineId: string, qty: number) => {
		loadingLineId = lineId;
		errorLineId = '';

		try {
			await graphql(`
				mutation changeQuantity($lineId: ID!, $qty: Int!) {
					adjustOrderLine(orderLineId: $lineId, quantity: $qty) {
						... on Order {
							lines {
								id
							}
						}
					}
				}
			`).mutate({ lineId, qty });

			await refreshActiveOrder();
		} catch (e) {
			console.error(e);
			errorLineId = lineId;
		}
		loadingLineId = '';
	};

	const removeLine = async (lineId: string) => {
		loadingLineId = lineId;
		errorLineId = '';
		try {
			await graphql(`
				mutation removeLine($lineId: ID!) {
					removeOrderLine(orderLineId: $lineId) {
						... on Order {
							lines {
								id
							}
						}
					}
					# TODO: return Order and use fragments instead
				}
			`).mutate({ lineId });

			await refreshActiveOrder();
		} catch (e) {
			console.error(e);
			errorLineId = lineId;
		}
		loadingLineId = '';
	};

	const refreshActiveOrder = async () =>
		activeOrder.fetch({ policy: 'NetworkOnly' as CachePolicy });
</script>

<div class="flow-root">
	<ul class="-my-6 divide-y divide-gray-200">
		{#if order}
			{#each order.lines as line (line.id)}
				{@const loading = loadingLineId === line.id}
				{@const error = errorLineId === line.id}
				<li
					class="py-6 flex transition-all duration-200 ease-out {loading
						? 'bg-gray-200 px-4 -mx-4 loading-bar-bottom rounded-md text-gray-400'
						: error
						? 'bg-red-100 px-4 -mx-4 rounded-md'
						: ''}"
				>
					<div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
						<img
							src={line.featuredAsset?.preview + '?preset=thumb'}
							alt={line.productVariant.name}
							class="w-full h-full object-center object-cover {loading ? 'grayscale' : ''}"
						/>
					</div>

					<div class="ml-4 flex-1 flex flex-col">
						<div>
							<div
								class="flex justify-between text-base font-medium {loading
									? 'text-gray-400'
									: 'text-gray-900'}"
							>
								<h3>
									<a href="/products{line.productVariant.product.slug}">
										{line.productVariant.name}
									</a>
								</h3>
								<p class="ml-4">
									<Price priceWithTax={line.linePriceWithTax} {currencyCode} />
								</p>
							</div>
						</div>
						<div class="flex-1 flex items-center text-sm">
							{#if editable}
								<form>
									<label for="quantity-{line.id}" class="mr-2"> Quantity </label>
									<select
										disabled={!editable || loading}
										id="quantity-{line.id}"
										name="quantity-{line.id}"
										value={line.quantity}
										on:change={(e) => !loading && changeQuantity(line.id, +e.currentTarget.value)}
										class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium {loading
											? 'text-gray-400 bg-gray-200'
											: 'text-gray-700'} text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
									>
										<option value={1}>1</option>
										<option value={2}>2</option>
										<option value={3}>3</option>
										<option value={4}>4</option>
										<option value={5}>5</option>
										<option value={6}>6</option>
										<option value={7}>7</option>
										<option value={8}>8</option>
									</select>
								</form>
							{:else}
								<div class="text-gray-800">
									<span class="mr-1">Quantity</span>
									<span class="font-medium">{line.quantity}</span>
								</div>
							{/if}
							<div class="flex-1" />
							<div class="flex">
								{#if editable}
									<button
										type="submit"
										name="removeItem"
										disabled={!editable || loading}
										value={line.id}
										class="font-medium {loading
											? 'text-gray-400'
											: 'text-primary-600 hover:text-primary-500'}"
										on:click={() => !loading && removeLine(line.id)}
									>
										Remove
									</button>
								{/if}
							</div>
						</div>

						{#if error}
							<div in:slide class="text-red-600 italic text-sm mt-3">
								Oops. Something went wrong.
							</div>
						{/if}
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
