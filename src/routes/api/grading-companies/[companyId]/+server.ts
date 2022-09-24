import createConnection from "$lib/database/connection";
import GradingCompanyRepository from "$lib/repository/grading-company-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds a particular grading company by ID. */
export const GET: RequestHandler = async function({params}) {
    // Ensure the grade ID is an integer.
    if (!Number.isInteger(+params.companyId)) {
        return new Response(null, {
            'status': 400,
            'statusText': 'The company ID is an invalid form, must be an integer.',
        });
    }

    /** The passed in coin group ID. */
    const companyId = Number.parseInt(params.companyId);

    try {
        const conn = await createConnection();
        const gradingCompanyRepo = new GradingCompanyRepository(conn);
        const gradingCompanies = await gradingCompanyRepo.findById(companyId);
        conn.end();

        return ResponseHelper.jsonResponse(
            `Successfully queried for the grading company with the ID ${companyId}.`,
            gradingCompanies,
        );
    } catch (e) {
        return ResponseHelper.serverErrorResponse();
    }
    
}