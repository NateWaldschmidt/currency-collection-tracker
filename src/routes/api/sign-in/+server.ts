import * as bcrypt from 'bcrypt';
import Auth, { type TokenPayload } from "$lib/server/utilities/auth";
import User from "$lib/entities/user.entity";
import type { RequestHandler } from "@sveltejs/kit";
import RequestHelper from '$lib/server/utilities/request-helper';
import ResponseHelper from '$lib/server/utilities/response-helper';

export const POST: RequestHandler = async function({ locals, request }) {
    // Checks if the user is already signed in.
    if (locals.user) {
        return ResponseHelper.jsonResponse({ message: 'You are already signed in to an account.' }, 200);
    }

    const requestBody = RequestHelper.serializeFormData(await request.formData());

    // The user repository.
    const userRepo = locals.dataSource.getRepository(User);
    /** The user found with the email. */
    const user = await userRepo.findOneBy({ displayName: requestBody['display-name'] });

    // Authenticate the user.
    if (user) {
        if (await bcrypt.compare(requestBody.password || '', user.password)) {
            /** How long the token is valid for in minutes. */
            const tokenValidationTime = 360;
            const currentDate = Date.now();

            /** The payload for the token. */
            const tokenPayload: TokenPayload = {
                id:          user.id,
                email:       user.email,
                displayName: user.displayName,
                exp:         Math.floor(currentDate / 1000) + (60 * tokenValidationTime),
                firstName:   user.firstName,
                lastName:    user.lastName,
            }

            return ResponseHelper.jsonResponse({ message: 'Successfully signed in to your account.' }, 200, {
                'Set-Cookie': Auth.createTokenCookie(
                    tokenPayload,
                    (currentDate + (tokenValidationTime * 60 * 1000)),
                ),
            });
        }
    }

    return ResponseHelper.jsonResponse(
        { message: 'The email or password you entered is incorrect.', errors: {} },
        422,
    );
}