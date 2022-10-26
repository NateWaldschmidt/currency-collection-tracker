import createConnection from "$lib/server/database/connection";
import UserRepository from "$lib/server/repository/user-repository";
import Auth, { type TokenPayload } from "$lib/server/utilities/auth";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';

export const POST: RequestHandler = async function(event: RequestEvent) {
    // Checks if the user is already signed in.
    if (event.locals.user) {
        return new Response(null, {
            'status': 400,
            'statusText': 'You are already signed in to an account.',
        });
    }

    /** The FormData received in the request. */
    const formData = await event.request.formData();
    /** The parts of the request body to search for. */
    const requestBody = {
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    }

    // Missing a required field in the request body.
    if (!requestBody.email || !requestBody.password) {
        return new Response(null, {
            'status': 400,
            'statusText': 'Missing a required field to authenticate sign in.',
        });
    }

    try {
        const conn = await createConnection();
        const userRepo = new UserRepository(conn);
        /** The user found with the email. */
        const user = await userRepo.findByEmail(requestBody.email);

        /** A generic error response for when something fails. */
        const ambiguousErrorMessage = 'The email or password you entered is incorrect.';

        // Did not find a user.
        if (!user) {
            conn.end();
            return new Response(null, {
                'status': 400,
                'statusText': ambiguousErrorMessage,
            });
        }
        // Validates the user has all necessary components for generating a token.
        if (!user.id || !user.email || !user.hashedPassword || !user.displayName) {
            conn.end();
            return new Response(null, {
                'status': 500,
                'statusText': 'There is a problem with this account, please contact an admin.',
            });
        }

        // Validate the user.
        if (await bcrypt.compare(requestBody.password, user.hashedPassword)) {
            /** How long the token is valid for in minutes. */
            const tokenValidationTime = 360;
            /** The current date for generating the token and it's cookie. */
            const currentDate = Date.now();

            /** The payload for the token. */
            const tokenPayload: TokenPayload = {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                exp: Math.floor(Date.now() / 1000) + (60 * tokenValidationTime),
                firstName: user.firstName,
                lastName: user.lastName,
            }

            conn.end();
            return new Response(null, {
                headers: {
                    'Set-Cookie': Auth.createTokenCookie(tokenPayload, (currentDate + (tokenValidationTime * 60 * 1000))),
                }
            });
        } else {
            conn.end();
            return new Response(null, {
                'status': 400,
                'statusText': ambiguousErrorMessage,
            });
        }
    } catch (e) {
        return ResponseHelper.serverErrorResponse();
    }
}