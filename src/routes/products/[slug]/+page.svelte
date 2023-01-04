<script lang="ts">
	import type { PageData } from './$houdini';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '$app/forms';

	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import ScrollableContainer from '$lib/components/product/scrollable-container.svelte';
	import TopReviews from '$lib/components/product/top-reviews.svelte';
	import Price from '$lib/components/product/price.svelte';
	import StockLevelLabel from '$lib/components/product/stock-level-label.svelte';
	import Alert from '$lib/components/alert.svelte';
	import { CheckIcon, HeartIcon } from '@babeard/svelte-heroicons/solid';

	export let data: PageData;
	export let form: ActionData;

	let submitState: 'idle' | 'loading' = 'idle';
	let selectedVariantId: string;

	$: ({ product: prod } = data);
	$: ({ ActiveOrder } = $page.data);

	// TODO: fix typescript `any`
	$: qtyInCart =
		$ActiveOrder?.data.lines?.find((l: any) => l.productVariant.id === selectedVariantId)
			?.quantity ?? 0;

	$: product = $prod.data!.product!;

	$: selectedVariant =
		product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

	$: featuredAsset = selectedVariant.featuredAsset;

	const handleVariantSelect = (event: { currentTarget: HTMLSelectElement }) => {
		selectedVariantId = event.currentTarget.value;
	};

	const submitAddToCart: SubmitFunction = () => {
		submitState = 'loading';
		return async ({ result, update }) => {
			await update();
			submitState = 'idle';
		};
	};
</script>

<div>
	<div class="max-w-6xl mx-auto px-4">
		<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
			{product.name}
		</h2>
		<Breadcrumbs items={product.collections[product.collections.length - 1]?.breadcrumbs ?? []} />
		<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
			<!-- Image gallery -->
			<div class="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
				<span class="rounded-md overflow-hidden">
					<div class="w-full h-full object-center object-cover rounded-lg">
						<img
							src={(featuredAsset?.preview || product.featuredAsset?.preview) + '?w=800'}
							alt={product.name}
							class="w-full h-full object-center object-cover rounded-lg"
						/>
					</div>
				</span>

				{#if product.assets.length > 1}
					<ScrollableContainer>
						{#each product.assets as asset}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="basis-1/3 md:basis-1/4 flex-shrink-0 select-none touch-pan-x rounded-lg {featuredAsset?.id ===
								asset.id
									? 'outline outline-2 outline-primary outline-offset-[-2px]'
									: ''}"
								on:click={() => (featuredAsset = asset)}
							>
								<!-- '?preset=full' not ideal, but technically prevents loading 2 seperate images -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<img
									draggable="false"
									class="rounded-lg select-none h-24 w-full object-cover"
									src="{asset.preview}?preset=full"
								/>
							</div>
						{/each}
					</ScrollableContainer>
				{/if}
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
				<div class="">
					<h3 class="sr-only">Description</h3>
					<div class="text-base text-gray-700">
						{@html product.description}
					</div>
				</div>

				<form method="POST" action="?/addToCart" use:enhance={submitAddToCart}>
					{#if product.variants.length > 1}
						<div class="mt-4">
							<label for="option" class="block text-sm font-medium text-gray-700">
								Select option
							</label>

							<select
								class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
								id="productVariant"
								value={selectedVariant.id}
								name="variantId"
								on:change={handleVariantSelect}
							>
								{#each product.variants as variant (variant.id)}
									<option value={variant.id}>
										{variant.name}
									</option>
								{/each}
							</select>
						</div>
					{:else}
						<input type="hidden" name="variantId" value={selectedVariant.id} />
					{/if}

					<div class="mt-10 flex flex-col sm:flex-row sm:items-center">
						<p class="text-3xl text-gray-900 mr-4">
							<Price
								priceWithTax={selectedVariant?.priceWithTax}
								currencyCode={selectedVariant?.currencyCode}
							/>
						</p>
						<div class="flex sm:flex-col1 align-baseline">
							<button
								type="submit"
								class="{submitState !== 'idle'
									? 'bg-gray-300'
									: qtyInCart === 0
									? 'bg-primary-600 hover:bg-primary-700'
									: 'bg-green-600 active:bg-green-700 hover:bg-green-700'} max-w-xs flex-1 transition-all border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full"
								disabled={submitState !== 'idle'}
								class:loading-bar-bottom={submitState !== 'idle'}
							>
								{#if qtyInCart}
									<span class="flex items-center">
										<CheckIcon class="w-5 h-5 mr-1" />
										{qtyInCart} in cart
									</span>
								{:else}
									Add to cart
								{/if}
							</button>

							<button
								type="button"
								class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
							>
								<HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
								<span class="sr-only">Add to favorites</span>
							</button>
						</div>
					</div>

					<div class="mt-2 flex items-center space-x-2">
						<span class="text-gray-500">{selectedVariant?.sku}</span>
						<StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
					</div>

					{#if form?.error}
						<div in:slide class="mt-4">
							<Alert message={form.error} />
						</div>
					{/if}

					<section class="mt-12 pt-12 border-t text-xs">
						<h3 class="text-gray-600 font-bold mb-2">Shipping & Returns</h3>
						<div class="text-gray-500 space-y-1">
							<p>Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days.</p>
							<p>
								Shipping costs depend on delivery address and will be calculated during checkout.
							</p>
							<p>
								Returns are subject to terms. Please see the
								<span class="underline">returns page</span> for further information.
							</p>
						</div>
					</section>
				</form>
			</div>
		</div>
	</div>
	<div class="mt-24">
		<TopReviews />
	</div>
</div>
