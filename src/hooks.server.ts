import { setSession } from '$houdini';
import { AUTH_TOKEN_KEY } from '$lib/constants';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(AUTH_TOKEN_KEY);

	// set the session information for this event
	setSession(event, { token });

	// pass the event onto the default handle
	return resolve(event);
};
