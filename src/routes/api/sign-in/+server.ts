import User from "$lib/entities/user.entity";
import Auth, { type TokenPayload } from "$lib/server/utilities/auth";
import type { RequestHandler } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';

export const POST: RequestHandler = async function({ locals, request }) {
    // Checks if the user is already signed in.
    if (locals.user) {
        return new Response(null, {
            'status': 400,
            'statusText': 'You are already signed in to an account.',
        });
    }

    /** The FormData received in the request. */
    const formData = await request.formData();
    /** The parts of the request body to search for. */
    const requestBody = {
        email:    formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    }

    // TODO Change to check for display_name.
    // Missing a required field in the request body.
    if (!requestBody.email || !requestBody.password) {
        return new Response(null, {
            'status': 400,
            'statusText': 'Missing a required field to authenticate sign in.',
        });
    }

    // The user repository.
    const userRepo = locals.dataSource.getRepository(User);
    /** The user found with the email. */
    const user = await userRepo.findOneBy({ email: requestBody.email });

    /** A generic error response for when something fails. */
    const ambiguousErrorMessage = 'The email or password you entered is incorrect.';

    // Did not find a user.
    if (!user) {
        return new Response(null, {
            'status': 400,
            'statusText': ambiguousErrorMessage,
        });
    }
    // Validates the user has all necessary components for generating a token.
    if (!user.id || !user.email || !user.password || !user.displayName) {
        return new Response(null, {
            'status': 500,
            'statusText': 'There is a problem with this account, please contact an admin.',
        });
    }

    // Validate the user.
    if (await bcrypt.compare(requestBody.password, user.password)) {
        /** How long the token is valid for in minutes. */
        const tokenValidationTime = 360;
        /** The current date for generating the token and it's cookie. */
        const currentDate = Date.now();

        /** The payload for the token. */
        const tokenPayload: TokenPayload = {
            id:          user.id,
            email:       user.email,
            displayName: user.displayName,
            exp:         Math.floor(Date.now() / 1000) + (60 * tokenValidationTime),
            firstName:   user.firstName,
            lastName:    user.lastName,
        }

        return new Response(null, {
            headers: {
                'Set-Cookie': Auth.createTokenCookie(
                    tokenPayload,
                    (currentDate + (tokenValidationTime * 60 * 1000)),
                ),
            }
        });
    } else {
        return new Response(null, {
            'status': 400,
            'statusText': ambiguousErrorMessage,
        });
    }
}