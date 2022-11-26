import GradingCompanyRepository from "$lib/server/repository/grading-company-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds a particular grading company by ID. */
export const GET: RequestHandler = async function({ locals, params }) {
    /** The passed in coin group ID. */
    const companyId = Number.parseInt(params.companyId);

    const gradingCompanyRepo = new GradingCompanyRepository(locals.connection);
    const gradingCompanies   = await gradingCompanyRepo.findById(companyId);

    return ResponseHelper.jsonResponse(
        `Successfully queried for the grading company with the ID ${companyId}.`,
        gradingCompanies,
    );
}