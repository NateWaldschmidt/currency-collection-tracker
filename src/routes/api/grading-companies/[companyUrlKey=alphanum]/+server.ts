import createConnection from "$lib/server/database/connection";
import GradingCompanyRepository from "$lib/server/repository/grading-company-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds a particular grading company by ID. */
export const GET: RequestHandler = async function({ locals, params }) {
    const gradingCompanyRepo = new GradingCompanyRepository(locals.connection);
    const gradingCompany = await gradingCompanyRepo.findByUrlKey(params.companyUrlKey);

    // Did not find a grading company with that ID.
    if (!gradingCompany) {
        return new Response(null, {
            status: 404,
            statusText: `Could not find a grading company with the URL key of ${params.companyUrlKey}.`,
        })
    }

    return ResponseHelper.jsonResponse(
        `Successfully queried for the grading company.`,
        gradingCompany,
    );
}