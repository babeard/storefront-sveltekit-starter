<script>
	import { page } from '$app/stores';
</script>

<main class="flex-grow mx-auto max-w-6xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
	<div class="flex-shrink-0 my-auto py-16 sm:py-32">
		<p class="text-sm font-semibold text-primary-600 uppercase tracking-wide">
			{$page.status} error
		</p>
		<h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
			{$page.error?.message || 'Something went wrong'}
		</h1>
		<p class="mt-2 text-base text-gray-500">
			Sorry, {$page.status === 404
				? 'we couldn’t find the page you’re looking for'
				: 'the page you were looking for encountered an error'}.
		</p>
		<div class="mt-6">
			<a href="/" class="text-base font-medium text-primary-600 hover:text-primary-500">
				Go back home<span aria-hidden="true"> &rarr;</span>
			</a>
		</div>
	</div>
</main>
