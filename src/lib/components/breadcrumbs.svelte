<script lang="ts">
	import HomeIcon from '@babeard/svelte-heroicons/solid/Home';

	export let items: { name: string; slug: string }[];

	$: nonRootItems = items.filter((item) => item.name !== '__root_collection__');
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol class="flex items-center space-x-1 md:space-x-4">
		<li>
			<div>
				<a href="/" class="text-gray-400 hover:text-gray-500">
					<HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
					<span class="sr-only">Home</span>
				</a>
			</div>
		</li>
		{#each nonRootItems as { name, slug } (name)}
			<li>
				<div class="flex items-center">
					<svg
						class="flex-shrink-0 h-5 w-5 text-gray-300"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
					</svg>
					<a
						href="/collections/{slug}"
						class="ml-2 md:ml-4 text-xs md:text-sm font-medium text-gray-500 hover:text-gray-700"
						>{name}</a
					>
				</div>
			</li>
		{/each}
	</ol>
</nav>
