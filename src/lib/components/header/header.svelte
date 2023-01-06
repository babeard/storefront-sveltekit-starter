<script lang="ts">
	import SearchBar from '$lib/components/header/search-bar.svelte';

	import type { GetCollections$result } from '$houdini';

	import { UserIcon } from '@babeard/svelte-heroicons/solid';
	import { ShoppingBagIcon } from '@babeard/svelte-heroicons/outline';
	import { cartOpen } from '$lib/stores/cart';

	export let mainCollections: GetCollections$result['collections']['items'] = [];
	export let cartQuantity: number = 0;

	// Handle window scroll events
	let isScrollingUp = false;
	let prevScrollPos = 0;
	const handleWindowScroll = () => {
		const currentScrollPos = window.pageYOffset;
		isScrollingUp = prevScrollPos > currentScrollPos;
		prevScrollPos = currentScrollPos;
	};

	const openCart = () => ($cartOpen = true);

	/** TODO: the following need to be replaced with real values */
	let isSignedIn = false;
</script>

<svelte:window on:scroll={handleWindowScroll} />

<header
	class="bg-gradient-to-r from-zinc-700 to-gray-900 shadow-lg transform {isScrollingUp
		? 'sticky top-0 z-10 animate-dropIn'
		: ''}"
>
	<div class="bg-zinc-100 text-gray-600 shadow-inner text-center text-sm py-2 px-2 xl:px-0">
		<div class="max-w-6xl mx-2 md:mx-auto flex items-center justify-between">
			<div>
				<p class="hidden sm:block">
					Exclusive: Get your own
					<a
						href="https://github.com/babeard/storefront-sveltekit-starter"
						target="_blank"
						rel="noreferrer"
						class="underline"
					>
						FREE storefront starter kit
					</a>
				</p>
			</div>
			<div>
				<a href={isSignedIn ? '/account' : '/sign-in'} class="flex items-center space-x-1">
					<UserIcon class="w-4 h-4" aria-hidden="true" />
					<span>{isSignedIn ? 'My Account' : 'Sign In'}</span>
				</a>
			</div>
		</div>
	</div>
	<div class="max-w-6xl mx-auto p-4 flex items-center space-x-4">
		<h1 class="text-white w-10">
			<a href="/">
				<img src="/cube-logo-small.webp" width={40} height={31} alt="Vendure logo" />
			</a>
		</h1>
		<div class="sm:space-x-4 hidden sm:flex">
			{#each mainCollections as collection (collection.id)}
				<a
					href="/collections/{collection.slug}"
					class="text-sm md:text-base text-gray-200 hover:text-white"
					data-sveltekit-preload-data="hover"
				>
					{collection.name}
				</a>
			{/each}
		</div>
		<div class="flex-1 md:pr-8">
			<SearchBar />
		</div>
		<div class="">
			<button
				class="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
				on:click={openCart}
				aria-label="Open cart tray"
			>
				<ShoppingBagIcon />
				{#if cartQuantity}
					<div class="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
						{cartQuantity}
					</div>
				{/if}
			</button>
		</div>
	</div>
</header>
