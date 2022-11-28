import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { AppDataSource } from "$lib/server/database/data-source";
import 'dotenv/config';
import type { TokenPayload } from '$lib/server/utilities/auth';
import type { GetSession, Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
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
                id:          tokenPayload.id,
                email:       tokenPayload.email,
                displayName: tokenPayload.displayName,
                firstName:   tokenPayload.firstName,
                lastName:    tokenPayload.lastName,
                exp:         tokenPayload.exp,
            }
        }
    }

    event.locals.dataSource = AppDataSource;
    if (!event.locals.dataSource.isInitialized) {
        await event.locals.dataSource.initialize();
    }

    /** The response for this request. */
    const response = await resolve(event);

    // Close the connection.
    event.locals.dataSource.destroy();

    return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession = function(event) {
    return event?.locals?.user ? {
        user: {
            id:          event.locals.user.id,
            email:       event.locals.user.email,
            displayName: event.locals.user.displayName,
            firstName:   event.locals.user.firstName,
            lastName:    event.locals.user.lastName,
        },
    } : {};
}