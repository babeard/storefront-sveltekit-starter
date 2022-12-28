<script>
	import '../app.css';

	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
</script>

<Header />

<slot />

<Footer />
