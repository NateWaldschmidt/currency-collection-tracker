import type { TokenPayload } from '$lib/server/utilities/auth';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import type { GetSession, Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = function ({ event, resolve }) {
    // Ensures the access token is set.
    if (!process.env['ACCESS_TOKEN_SECRET']) {
        throw new ReferenceError('Secret access token cannot be found.');
    }

    /** All of the cookies. */
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    
    // Verifies the JWT.
    if (cookies.token && jwt.verify(cookies.token, process.env['ACCESS_TOKEN_SECRET'])) {
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

    } else {
        event.locals.user = null;
    }

    return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession = function(event) {
    return event?.locals?.user ? {
        user: {
            id: event.locals.user.id,
            email: event.locals.user.email,
            displayName: event.locals.user.displayName,
            firstName: event.locals.user.firstName,
            lastName: event.locals.user.lastName,
        },
    } : {};
}