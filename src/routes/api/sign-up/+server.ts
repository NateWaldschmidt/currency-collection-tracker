import Auth from "$lib/server/utilities/auth";
import User from "$lib/entities/user.entity";
import RequestHelper from "$lib/server/utilities/request-helper";
import ResponseHelper from "$lib/server/utilities/response-helper";
import { validate } from "class-validator";
import type { RequestHandler } from "@sveltejs/kit";

/** Handles the creation of new user accounts. */
export const POST: RequestHandler = async function({ request, locals }) {
    // Checks if the user is already signed in.
    if (locals.user) {
        return new Response(null, {
            'status': 200,
            'statusText': 'You are already signed in to an account.',
        });
    }
    
    /** The parts of the request body to search for. */
    const requestBody = RequestHelper.serializeFormData(await request.formData());

    // Ensure the password is set.
    if (!requestBody['password']) {
        return new Response(null, {
            'status': 400,
            'statusText': 'Missing password.',
        });
    }

    /** This will be the user created within the database. */
    const user = new User();
    user.email = requestBody['email'];
    user.displayName = requestBody['display-name'];
    user.password = await Auth.hashUserPassword(requestBody['password']); // TODO Check for requirements.
    user.firstName = requestBody['first-name'] || undefined;
    user.lastName = requestBody['last-name'] || undefined;

    /** Any errors found while validating the user information. */
    const errors = await validate(user);
    
    // All was good.
    if (errors.length > 0) {
        return ResponseHelper.validationErrorResponse('There was an error signing up.', errors);
    }

    // Create the user.
    locals.dataSource.manager.save(user);

    return ResponseHelper.jsonResponse({ message: 'Successfully created and signed into a user account.' }, 201);
}