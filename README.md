# Vendure SvelteKit Storefront Starter

An e-commerce storefront for [Vendure](https://www.vendure.io) built with [SvelteKit](https://kit.svelte.dev/).

## To do

- Cart
- Checkout flow
- Search facet filters
- Login
- Account creation
- Customer account management

**Contributions welcome!**

## Development

1. Clone this repo
2. `npm install`
3. Create a `.env` file in the root dir with the following contents:
   ```.env
   VENDURE_API_URL=https://readonlydemo.vendure.io/shop-api
   NODE_ENV=development
   ```
4. `npm run dev` - run the storefront with a local SvelteKit server

### Vendure Server

This storefront requires a Vendure server. You can either run a local instance, or use our public demo server.

#### Local

You can set up a local instance, populated with test data by following the instructions in the Vendure [Getting Started guide](https://www.vendure.io/docs/getting-started/). Note that if you have SvelteKit configured to run on port 3000 by default, you should change the local Vendure server to run on another port, and also make sure you have enabled the `bearer` method for managing session tokens:

```ts
// vendure-config.ts
export const config: VendureConfig = {
	apiOptions: {
		port: 3001
		// ...
	},
	authOptions: {
		tokenMethod: ['bearer', 'cookie'] // or just 'bearer'
		// ...
	}
	// ...
};
```

## Payment Gateways

Currently, both Stripe and Braintree are supported out of the box, but only one of them can be used at the same time

### Stripe integration

This repo has a built-in Stripe payment integration. To enable it, ensure that your Vendure server is set up with
the [StripePlugin](https://www.vendure.io/docs/typescript-api/payments-plugin/stripe-plugin/).

Ensure your new PaymentMethod uses the word `stripe` somewhere in its code, as that's how this integration will know
to load the Stripe payment element.

Then add your Stripe publishable key to the env file:

```
STRIPE_PUBLISHABLE_KEY=pk_test_t38hl...etc
```

### Braintree integration

This repo has built-in Braintree integration. To enable it, ensure that your Vendure server is set up with
the [BraintreePlugin](https://www.vendure.io/docs/typescript-api/payments-plugin/braintree-plugin/).

Currently, `storeCustomersInBraintree` has to be set to `true` in plugin options.

## License

MIT
