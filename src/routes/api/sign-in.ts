import createConnection from "$lib/database/connection";
import UserRepository from "$lib/repository/user-repository";
import Auth, { type TokenPayload } from "$lib/utilities/auth";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestEvent } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(event: RequestEvent) {
    /** A generic error response for when something fails. */
    const ambiguousErrorMessage = 'The email or password you entered is incorrect.';
    /** The FormData received in the request. */
    const formData = await event.request.formData();
    /** The parts of the request body to search for. */
    const requestBody = {
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    }

    // Missing a required field in the request body.
    if (!requestBody.email || !requestBody.password) return ResponseHelper.createErrorResponse(400, 'Missing a required field to authenticate.');

    try {
        /** The database connection. */
        const conn = await createConnection();
        /** Allows working with the user related tables. */
        const userRepo = new UserRepository(conn);
        /** The user found in the database. */
        const user = await userRepo.findByEmail(requestBody.email);

        // Did not find a user.
        // This error message displays on purpose as to not give away more information than necessary.
        if (!user) return ResponseHelper.createErrorResponse(400, ambiguousErrorMessage);
        // Validates the user has all necessary components for generating a token.
        if (!user.id || !user.email || !user.hashedPassword || !user.displayName) return ResponseHelper.createErrorResponse(500, 'There is a problem with this account, please contact an admin.');

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
            return {
                headers: { 'Set-Cookie': Auth.createTokenCookie(tokenPayload, (currentDate + (tokenValidationTime * 60 * 1000))) },
                status: 302,
                redirect: '/sign-in',
            }
        } else {
            conn.end();
            return ResponseHelper.createErrorResponse(400, ambiguousErrorMessage);
        }
    } catch (err) {
        return ResponseHelper.createErrorResponse(500, 'There was an error processing your request, please try again later.');
    }
}