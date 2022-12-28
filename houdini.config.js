/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	apiUrl: 'env:PUBLIC_VENDURE_API_URL',
	plugins: {
		'houdini-svelte': {
			client: './src/lib/graphql/client.ts'
		}
	},
	scalars: {
		DateTime: {
			type: 'string'
		}
	}
};

export default config;
