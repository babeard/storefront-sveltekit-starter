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
			type: 'Date',
			unmarshal(str) {
				return new Date(str);
			},
			marshal(date) {
				return date.toISOString();
			}
		},
		JSON: {
			type: 'any',
			unmarshal(str) {
				return JSON.parse(str);
			},
			marshal(obj) {
				return JSON.stringify(obj);
			}
		}
	}
};

export default config;
