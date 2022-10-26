import createConnection         from "$lib/server/database/connection";
import GradingCompanyRepository from "$lib/server/repository/grading-company-repository";
import ResponseHelper           from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the grading companies. */
export const GET: RequestHandler = async function() {
    try {
        const conn = await createConnection();
        const gradingCompanyRepo = new GradingCompanyRepository(conn);
        const gradingCompanies = await gradingCompanyRepo.findAll();
        conn.end();

        return ResponseHelper.jsonResponse(
            `Successfully queried for all the grading companies.`,
            gradingCompanies
        );
    } catch(e) {
        return ResponseHelper.serverErrorResponse();
    }
}