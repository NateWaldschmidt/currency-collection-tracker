import GradingCompany from "$lib/entities/coins/grading-company.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds a particular grading company by ID. */
export const GET: RequestHandler = async function ({ locals, params }) {
    /** The passed in coin group ID. */
    const companyId = Number.parseInt(params.companyId || '0');

    const gradingCompanyRepo = locals.dataSource.getRepository(GradingCompany);
    const gradingCompanies = await gradingCompanyRepo.findBy({ id: companyId });

    return ResponseHelper.jsonResponse(
        { message: `Successfully queried for the grading company with the ID ${companyId}.` , data: gradingCompanies },
        200,
    );
}