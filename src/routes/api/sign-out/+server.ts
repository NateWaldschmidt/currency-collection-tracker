import cookie from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export function put() {
    return {
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
        },
        status: 200,
    }
}