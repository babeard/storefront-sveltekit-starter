<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import CartTray from '$lib/components/cart/cart-tray.svelte';

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

	$: cartQuantity = $ActiveOrder.data?.activeOrder?.totalQuantity ?? 0;

	const rootCollectionsFilter = (item: CollectionItem) =>
		item?.parent?.name === '__root_collection__';
</script>

<Header {mainCollections} {cartQuantity} />

<main>
	<slot />
</main>

<CartTray activeOrder={ActiveOrder} />

<Footer {mainCollections} />
