<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { FunnelIcon } from '@babeard/svelte-heroicons/solid';

	const dispatch = createEventDispatcher();

	export let filterCount: number;
</script>

<button
	type="button"
	class="flex space-x-2 items-center border rounded p-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
	on:click={(evt) => dispatch('click', evt)}
>
	{#if !!filterCount}
		<span
			class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-200 text-primary-800"
		>
			{filterCount}
		</span>
	{/if}

	<span>Filters</span>
	<FunnelIcon class="w-5 h-5" aria-hidden="true" />
</button>
