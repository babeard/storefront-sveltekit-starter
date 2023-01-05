import { browser } from '$app/environment';
import { PUBLIC_VENDURE_API_URL } from '$env/static/public';
import { HoudiniClient, type RequestHandler } from '$houdini';

const requestHandler: RequestHandler = async ({ fetch, text = '', variables = {}, session }) => {
	const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };

	if (session?.token) {
		headers['Authorization'] = `Bearer ${session.token}`;
	}

	const result = await fetch(PUBLIC_VENDURE_API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query: text,
			variables
		})
	});

	if (browser) {
		const token = result.headers.get('vendure-auth-token');
		if (token) {
			await fetch('/api/setToken', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token })
			});
		}
	}

	return await result.json();
};

export default new HoudiniClient(requestHandler);
