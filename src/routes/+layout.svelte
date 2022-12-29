<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';

	import type { LayoutData } from './$types';
	import type {
		GetCollectionsStore,
		GetCollections$result,
		ActiveCustomerStore,
		ActiveChannelStore,
		ActiveOrderStore
	} from '$houdini';

	type CollectionItem = GetCollections$result['collections']['items'][0];

	export let data: LayoutData & {
		GetCollections: GetCollectionsStore;
		ActiveCustomer: ActiveCustomerStore;
		ActiveChannel: ActiveChannelStore;
		ActiveOrder: ActiveOrderStore;
	};
	$: ({ GetCollections, ActiveCustomer, ActiveChannel, ActiveOrder } = data);

	$: mainCollections =
		$GetCollections.data?.collections?.items?.filter(rootCollectionsFilter) || [];

	const rootCollectionsFilter = (item: CollectionItem) =>
		item?.parent?.name === '__root_collection__';
</script>

<Header {mainCollections} />

<main>
	<slot />
</main>

<Footer />
