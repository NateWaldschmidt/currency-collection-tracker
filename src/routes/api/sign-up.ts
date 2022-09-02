import createConnection from "$lib/database/connection";
import User from "$lib/models/user";
import UserRepository from "$lib/repository/user-repository";
import RequestHelper from "$lib/utilities/request-helper";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestEvent } from "@sveltejs/kit";
import Joi from 'joi';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(event: RequestEvent) {
    /** The parts of the request body to search for. */
    const requestBody = RequestHelper.serializeFormData(await event.request.formData());

    // Open connections.
    try {
        /** This will be the user created within the database. */
        const user = new User();
        user.email       = requestBody['email'];
        user.displayName = requestBody['display-name'];
        user.password    = requestBody['password'];
        user.firstName   = requestBody['first-name'];
        user.lastName    = requestBody['last-name'];
        await user.validate();

        /** The database connection. */
        const conn = await createConnection();
        /** The User Repository used to create the user. */
        const userRepo = new UserRepository(conn);

        /** A response if the account already exists in some way (email or display name). */
        const existingAccountResponse = ResponseHelper.createErrorResponse(
            400,
            'There is an account that exists with these credentials already.',
        );

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
        await conn.end();

        return ResponseHelper.createSuccessResponse(
            201,
            'Successfully created and signed into a user account.'
        );

    } catch (e) {
        if (e instanceof Joi.ValidationError) {
            return ResponseHelper.createErrorResponse(
                400,
                e.message,
            );
        } else {
            return ResponseHelper.createErrorResponse(
                500,
                ResponseHelper.GENERIC_SERVER_ERROR,
            );
        }
    }
}