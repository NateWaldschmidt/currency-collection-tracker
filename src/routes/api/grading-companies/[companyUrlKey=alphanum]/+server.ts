import createConnection from "$lib/database/connection";
import GradingCompanyRepository from "$lib/repository/grading-company-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds a particular grading company by ID. */
export const GET: RequestHandler = async function({params}) {
    const urlKey = params.companyUrlKey;

    try {
        const conn = await createConnection();
        const gradingCompanyRepo = new GradingCompanyRepository(conn);
        const gradingCompany = await gradingCompanyRepo.findByUrlKey(urlKey);
        conn.end();

        // Did not find a grading company with that ID.
        if (!gradingCompany) {
            return new Response(null, {
                status: 404,
                statusText: `Could not find a grading company with the URL key of ${urlKey}.`,
            })
        }

        return ResponseHelper.jsonResponse(
            `Successfully queried for the grading company.`,
            gradingCompany,
        );
    } catch (e) {
        return ResponseHelper.serverErrorResponse();
    }
    
}