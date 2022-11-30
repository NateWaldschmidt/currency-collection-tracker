import CamelToKebab from "$lib/utilities/camel-to-kebab";
import type { ValidationError } from "class-validator";

export interface ApiResponseBody {
    /** A message relaying what happened with the request. */
    message: string,
    /** A brief summary of what the message is conveying. */
    description?: string,
    /** Any data corresponding to the response. */ 
    data?: object,
    // warnings?: {}, // TODO Maybe add warnings to the response body?
    // If undefined, there were no errors.
    errors?: {
        /** The error that occurred. */
        errors: string[],
        /** The path to the field that the error occurred on. */
        path: string,
    }[],
}

/** Contains helper functions and constants for responses. */
export default class ResponseHelper {
    /** A standard error message for generic server errors. */
    public static readonly GENERIC_SERVER_ERROR = 'There was a server error, please try again later.';

    /**
     * Creates the Response object to send JSON data in endpoints.
     * 
     * @param body
     * @param status The status to send with the response.
     * @param headers
     * @returns A JSON response.
     */
    public static jsonResponse(body: ApiResponseBody, status: number = 200, headers?: HeadersInit): Response {
        return new Response(
            JSON.stringify(body),
            {
                status: status,
                headers: {'Content-Type': 'application/json', ...headers},
            }
        );
    }

    /**
     * Returns a 422 response because the information was invalid. The structure of the data and everything was good
     * though.
     * 
     * @param message 
     * @returns 
     */
    public static validationErrorResponse(message: string, errors: ValidationError[]): Response {
        const body: ApiResponseBody = {
            message: message,
            errors: [],
        };

        // Format the validation errors.
        errors.forEach((error: ValidationError) => {
            body.errors?.push({
                errors: Object.values(error.constraints || {} ),
                path: CamelToKebab(error.property),
            });
        });

        return this.jsonResponse(body, 422);
    }
}