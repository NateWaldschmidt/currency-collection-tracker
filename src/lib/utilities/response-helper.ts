/** An interface for sending error responses. */
interface ErrorResponse {
    status: number,
    body: {
        error: string,
        data?: any,
    },
}

/** An interface for sending success responses. */
interface SuccessResponse {
    status: number,
    body: {
        success: string,
        data?: any,
    }
}

/** Contains helper functions and constants for responses. */
export default class ResponseHelper {
    /** A standard error message for generic server errors. */
    public static readonly GENERIC_SERVER_ERROR = 'There was a server error, please try again later.';

    /**
     * A helper function for generating error messages.
     * 
     * @param status The HTTP status code for the response.
     * @param message The error message for the response.
     * @returns The ErrorResponse object to be sent as the response.
     */
    public static createErrorResponse(status: number, message: string): ErrorResponse {
        return {
            status: status,
            body: {
                error: message,
            },
        }
    }

    /**
     * Creates a standardized success response with a message and any data if necessary.
     * 
     * @param message The success message to be sent.
     * @param data    Any data associated with the request.
     * 
     * @returns A JSON stringified object. 
     */
    public static stringifySuccessResponse(message: string, data?: any): string {
        return JSON.stringify({
            success: message,
            data: data,
        });
    }

    /**
     * A helper function for generating standardized success messages.
     * 
     * @param status The HTTP status code for the response.
     * @param message The success message for the response.
     * @returns The SuccessResponse object to be sent as the response.
     */
     public static createSuccessResponse(status: number, message: string, data?: any): SuccessResponse {
        return {
            status: status,
            body: {
                success: message,
                data: data,
            },
        }
    }
}