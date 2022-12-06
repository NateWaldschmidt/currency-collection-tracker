import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { AppDataSource } from "$lib/server/database/data-source";
import 'dotenv/config';
import type { TokenPayload } from '$lib/server/utilities/auth';
import type { Handle } from '@sveltejs/kit';

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

    /** The response for this request. */
    const response = await resolve(event);

    return response;
}