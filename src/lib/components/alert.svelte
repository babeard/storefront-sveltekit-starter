<script lang="ts">
	import { XCircleIcon } from '@babeard/svelte-heroicons/solid';

	export let message: string;
</script>

<div class="rounded-md bg-red-50 p-4">
	<div class="flex">
		<div class="flex-shrink-0">
			<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
		</div>
		<div class="ml-3">
			<h3 class="text-sm font-medium text-red-800">{message}</h3>
		</div>
	</div>
</div>
