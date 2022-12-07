import GradingCompany from "$lib/entities/coins/grading-company.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the grading companies. */
export const GET: RequestHandler = async function({ locals }) {
        const gradingCompanyRepo = locals.dataSource.getRepository(GradingCompany);

        return ResponseHelper.jsonResponse(
            { message: `Successfully queried for all the grading companies.`, data: gradingCompanyRepo.find() },
            200,
        );
}