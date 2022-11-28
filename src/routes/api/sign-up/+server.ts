import User from "$lib/entities/user.entity";
import Auth from "$lib/server/utilities/auth";
import RequestHelper from "$lib/server/utilities/request-helper";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

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
    user.password    = await Auth.hashUserPassword(requestBody['password']);
    user.firstName   = requestBody['first-name'];
    user.lastName    = requestBody['last-name'];

    locals.dataSource.manager.save(user);

    return ResponseHelper.jsonResponse(
        'Successfully created and signed into a user account.',
        null,
        201,
    );
}