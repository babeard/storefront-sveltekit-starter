<script lang="ts">
	import {
		Transition,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle
	} from '@rgossiaux/svelte-headlessui';

	import { XMarkIcon } from '@babeard/svelte-heroicons/outline';
	import { cartOpen } from '$lib/stores/cart';
	import type { ActiveOrderStore } from '$houdini';
	import { page } from '$app/stores';
	import CartContents from './cart-contents.svelte';
	import Price from '../product/price.svelte';

	export let activeOrder: ActiveOrderStore;

	$: editable = $page.url.pathname !== '/checkout';
	$: order = $activeOrder.data?.activeOrder;
	$: currencyCode = order?.currencyCode;

	const close = () => ($cartOpen = false);

	const handleEscapeKey = (evt: KeyboardEvent) => {
		if ($cartOpen && evt.key === 'Escape') close();
	};
</script>

<svelte:window on:keyup={handleEscapeKey} />

<Transition show={$cartOpen}>
	<Dialog as="div" class="fixed inset-0 overflow-hidden z-20" on:close={close}>
		<div class="absolute inset-0 overflow-hidden">
			<TransitionChild
				enter="ease-in-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</TransitionChild>

			<TransitionChild
				as="div"
				enter="transform transition ease-in-out duration-300 sm:duration-300"
				enterFrom="translate-x-full"
				enterTo="translate-x-0"
				leave="transform transition ease-in-out duration-300 sm:duration-300"
				leaveFrom="translate-x-0"
				leaveTo="translate-x-full"
				class="fixed inset-y-0 right-0 pl-10 max-w-full flex"
			>
				<div class="w-screen max-w-md">
					<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
						<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
							<div class="flex items-start justify-between">
								<DialogTitle class="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
								<div class="ml-3 h-7 flex items-center">
									<button
										type="button"
										class="-m-2 p-2 text-gray-400 hover:text-gray-500"
										on:click={close}
									>
										<span class="sr-only">Close panel</span>
										<XMarkIcon class="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
							</div>

							<div class="mt-8">
								{#if order?.totalQuantity}
									<CartContents {editable} {activeOrder} />
								{:else}
									<div class="flex items-center justify-center h-48 text-xl text-gray-400">
										Your cart is empty
									</div>
								{/if}
							</div>
						</div>

						{#if order?.totalQuantity && editable}
							<div class="border-t border-gray-200 py-6 px-4 sm:px-6">
								<div class="flex justify-between text-base font-medium text-gray-900">
									<p>Subtotal</p>
									<p>
										{#if currencyCode}
											<Price priceWithTax={order?.subTotalWithTax ?? 0} {currencyCode} />
										{/if}
									</p>
								</div>
								<p class="mt-0.5 text-sm text-gray-500">Shipping will be calculated at checkout.</p>
								<div class="mt-6">
									<a
										href="/checkout"
										on:click={close}
										class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
									>
										Checkout
									</a>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
