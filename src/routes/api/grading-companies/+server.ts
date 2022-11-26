import GradingCompanyRepository from "$lib/server/repository/grading-company-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the grading companies. */
export const GET: RequestHandler = async function({ locals }) {
        const gradingCompanyRepo = new GradingCompanyRepository(locals.connection);
        const gradingCompanies   = await gradingCompanyRepo.findAll();

        return ResponseHelper.jsonResponse(
            `Successfully queried for all the grading companies.`,
            gradingCompanies
        );
}