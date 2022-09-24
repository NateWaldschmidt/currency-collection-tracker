import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PUT: RequestHandler = async function() {
    return new Response(null, {
        headers: {
            'Set-Cookie': cookie.serialize(
                'token',
                '',
                {
                    httpOnly: true,
                    path: '/',
                    expires: new Date(0),
                }
            ),
        }
    });
}