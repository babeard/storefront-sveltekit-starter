# Vendure SvelteKit Storefront Starter

An e-commerce storefront for [Vendure](https://www.vendure.io) built with [SvelteKit](https://kit.svelte.dev/), [Houdini](https://www.houdinigraphql.com/), and [TailwindCSS](https://tailwindcss.com/). Heavily inspired by the official [Vendure Remix Storefront Starter](https://github.com/vendure-ecommerce/storefront-remix-starter) and [Vendure Sveltekit Storefront](https://github.com/spences10/sveltekit-vendure-commerce).

## Why another SvelteKit storefront?

Currently, this repo is for educational purposes only. The goal was to learn Houdini and Vendure, so I decided to combine the two. It could also be useful to check out the other repos listed above for inspiration on different ways to tackle the same problem set within similar technology stacks.

## To do

- Cart ✅
- Checkout flow
- Search facet filters ✅
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

## License

MIT
