import User from "$lib/models/user";
import UserRepository from "$lib/server/repository/user-repository";
import RequestHelper from "$lib/server/utilities/request-helper";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";
import Joi from 'joi';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST: RequestHandler = async function({ request, locals }) {
    // Checks if the user is already signed in.
    if (locals.user) {
        return new Response(null, {
            'status': 400,
            'statusText': 'You are already signed in to an account.',
        });
    }
    
    /** The parts of the request body to search for. */
    const requestBody = RequestHelper.serializeFormData(await request.formData());

    /** This will be the user created within the database. */
    const user = new User();
    user.email       = requestBody['email'];
    user.displayName = requestBody['display-name'];
    user.password    = requestBody['password'];
    user.firstName   = requestBody['first-name'];
    user.lastName    = requestBody['last-name'];

    try {
        await user.validate();
        
    } catch (e) {
        // Validation error.
        if (e instanceof Joi.ValidationError) {
            return new Response(null, {
                'status': 400,
                'statusText': e.message,
            });
        }

        // Bad bad...
        throw e;
    }

    /** The User Repository used to create the user. */
    const userRepo = new UserRepository(locals.connection);

    /** A response if the account already exists in some way (email or display name). */
    const existingAccountResponse = new Response(null, {
        'status': 400,
        'statusText': 'This account exists already.',
    });

    // Checks for an existing user with this email.
    if (await userRepo.findByEmail(requestBody['email'])) {
        return existingAccountResponse;
    }
    // Checks for an existing user with this display name.
    if (await userRepo.findByDisplayName(requestBody['display-name'])) {
        return existingAccountResponse;
    }
    
    // Creates the new user.
    await userRepo.create(user);

    return ResponseHelper.jsonResponse(
        'Successfully created and signed into a user account.',
        null,
        201,
    );
}