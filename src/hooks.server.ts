import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AppDataSource } from "$lib/server/database/data-source";
import type { TokenPayload } from '$lib/server/utilities/auth';
import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
    // Ensures the access token is set.
    if (!process.env['ACCESS_TOKEN_SECRET']) {
        throw new ReferenceError('Secret access token cannot be found.');
    }

    /** All of the cookies. */
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    
    // Verifies the JWT.
    if (typeof cookies.token == 'string') {
        if (jwt.verify(cookies.token, process.env['ACCESS_TOKEN_SECRET'])) {
            /** The token's payload. */
            const tokenPayload: TokenPayload = (<TokenPayload> jwt.decode(cookies.token));

            /** Sets some user data to be used within the different routes. */
            event.locals.user = {
                id: tokenPayload.id,
                email: tokenPayload.email,
                displayName: tokenPayload.displayName,
                firstName: tokenPayload.firstName,
                lastName: tokenPayload.lastName,
                exp: tokenPayload.exp,
            }
        }
    }

    event.locals.dataSource = AppDataSource;

    if (event.url.pathname.startsWith('/api/users')) {
        if (!event.locals.user) {
            throw error(401, 'You must be authenticated to view user routes.');
        }
        if (event.locals.user.id.toString() !== event.params.userId) {
            throw error(403, 'You are not allowed to view this user.');
        }
    }

    /** The response for this request. */
    const response = await resolve(event);

    return response;
}