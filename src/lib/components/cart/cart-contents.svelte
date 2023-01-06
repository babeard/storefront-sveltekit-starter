<script lang="ts">
	import type { ActiveOrder$result, CurrencyCode } from '$houdini';
	import Price from '../product/price.svelte';

	export let orderLines: ActiveOrder$result['activeOrder']['lines'] = []; // TODO: typescript
	export let editable = false;
	export let currencyCode: CurrencyCode = 'USD' as CurrencyCode.USD;

	/** TODO: the following need to be replaced with real values eventually */
	const changeQuantity = (lineId: string, qty: number) => {
		console.log('change quantity', lineId, qty);
	};
	const removeLine = (lineId: string) => {
		console.log('remove line', lineId);
	};
</script>

<div class="flow-root">
	<ul class="-my-6 divide-y divide-gray-200">
		{#each orderLines as line (line.id)}
			<li class="py-6 flex">
				<div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
					<img
						src={line.featuredAsset?.preview + '?preset=thumb'}
						alt={line.productVariant.name}
						class="w-full h-full object-center object-cover"
					/>
				</div>

				<div class="ml-4 flex-1 flex flex-col">
					<div>
						<div class="flex justify-between text-base font-medium text-gray-900">
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
									disabled={!editable}
									id="quantity-{line.id}"
									name="quantity-{line.id}"
									value={line.quantity}
									on:change={(e) => changeQuantity(line.id, +e.currentTarget.value)}
									class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
									value={line.id}
									class="font-medium text-primary-600 hover:text-primary-500"
									on:click={() => removeLine(line.id)}
								>
									Remove
								</button>
							{/if}
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
