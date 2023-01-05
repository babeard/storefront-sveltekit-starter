import { AUTH_TOKEN_KEY } from '$lib/constants';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { token } = await request.json();

	cookies.set(AUTH_TOKEN_KEY, token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	return new Response('ok');
};
