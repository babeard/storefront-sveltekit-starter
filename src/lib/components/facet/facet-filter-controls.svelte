<script lang="ts">
	import type { FacetWithValues } from 'src/routes/collections/[slug]/facet';

	import { createEventDispatcher } from 'svelte';

	import {
		Dialog,
		DialogOverlay,
		Disclosure,
		DisclosurePanel,
		DisclosureButton,
		TransitionRoot,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	// Use until a PR is merged to add this component to svelte-headlessui
	// See: https://github.com/rgossiaux/svelte-headlessui/issues/112
	// TODO: Remove this import once PR is merged
	import { DialogPanel } from '@developermuch/dev-svelte-headlessui';

	import { XMarkIcon } from '@babeard/svelte-heroicons/outline';
	import { MinusSmallIcon, PlusSmallIcon } from '@babeard/svelte-heroicons/solid';

	const dispatch = createEventDispatcher();

	export let facetWithValues: FacetWithValues[];
	export let mobileFiltersOpen = false;

	const handleFilterChange = ({ target }: Event) => {
		const { value, checked } = target as HTMLInputElement;

		dispatch('change', { value, checked });
	};

	// For mobile close handling
	const close = () => dispatch('close');
	const handleKeyUp = (evt: KeyboardEvent) => {
		if (mobileFiltersOpen && evt.key === 'Escape') close();
	};
</script>

<svelte:window on:keyup={handleKeyUp} />

<!-- Mobile filter dialog -->
<TransitionRoot show={mobileFiltersOpen}>
	<Dialog as="div" class="relative z-40 lg:hidden" on:close={close}>
		<TransitionChild
			enter="transition-opacity ease-linear duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity ease-linear duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
		</TransitionChild>

		<TransitionChild
			enter="transition ease-in-out duration-500 transform"
			enterFrom="translate-x-full"
			enterTo="translate-x-0"
			leave="transition ease-in-out duration-500 transform"
			leaveFrom="translate-x-0"
			leaveTo="translate-x-full"
			class="fixed top-0 right-0 flex z-40 w-full pointer-events-none"
		>
			<DialogPanel
				class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto pointer-events-auto"
			>
				<div class="px-4 flex items-center justify-between">
					<h2 class="text-lg font-medium text-gray-900">Filters</h2>
					<button
						type="button"
						class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
						on:click={close}
					>
						<span class="sr-only">Close menu</span>
						<XMarkIcon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<form
					class="mt-4 border-t w-full border-gray-200"
					method="get"
					on:change={handleFilterChange}
				>
					{#each facetWithValues as facet (facet.id)}
						<Disclosure
							as="div"
							defaultOpen={true}
							class="border-t border-gray-200 px-4 py-6"
							let:open
						>
							<h3 class="-mx-2 -my-3 flow-root">
								<DisclosureButton
									class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
								>
									<span class="font-medium text-gray-900 uppercase">
										{facet.name}
									</span>
									<span class="ml-6 flex items-center">
										{#if open}
											<MinusSmallIcon class="h-5 w-5" aria-hidden="true" />
										{:else}
											<PlusSmallIcon class="h-5 w-5" aria-hidden="true" />
										{/if}
									</span>
								</DisclosureButton>
							</h3>
							<DisclosurePanel class="pt-6">
								<div class="space-y-6">
									{#each facet.values as value, optionIdx (value.id)}
										<div class="flex items-center">
											<input
												id={`filter-mobile-${facet.id}-${optionIdx}`}
												name={`fvid`}
												value={value.id}
												type="checkbox"
												checked={value.selected}
												on:change={() => {}}
												class="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
											/>
											<label
												for="filter-mobile-{facet.id}-{optionIdx}"
												class="ml-3 min-w-0 flex-1 text-gray-500"
											>
												{value.name}
											</label>
										</div>
									{/each}
								</div>
							</DisclosurePanel>
						</Disclosure>
					{/each}
				</form>
			</DialogPanel>
		</TransitionChild>
	</Dialog>
</TransitionRoot>

<form method="get" class="hidden lg:block" on:change={handleFilterChange}>
	{#each facetWithValues as facet (facet.id)}
		<Disclosure as="div" defaultOpen={true} class="border-b border-gray-200 py-6" let:open>
			<h3 class="-my-3 flow-root">
				<DisclosureButton
					class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
				>
					<span class="font-medium text-gray-900 uppercase">
						{facet.name}
					</span>
					<span class="ml-6 flex items-center">
						{#if open}
							<MinusSmallIcon class="h-5 w-5" aria-hidden="true" />
						{:else}
							<PlusSmallIcon class="h-5 w-5" aria-hidden="true" />
						{/if}
					</span>
				</DisclosureButton>
			</h3>
			<DisclosurePanel class="pt-6">
				<div class="space-y-4">
					{#each facet.values as value, optionIdx (value.id)}
						<div class="flex items-center">
							<input
								id="filter-{facet.id}-{optionIdx}"
								name={`fvid`}
								value={value.id}
								type="checkbox"
								checked={value.selected}
								on:change={() => {}}
								class="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
							/>
							<label for="filter-{facet.id}-{optionIdx}" class="ml-3 text-sm text-gray-600">
								{value.name}
							</label>
						</div>
					{/each}
				</div>
			</DisclosurePanel>
		</Disclosure>
	{/each}
</form>
