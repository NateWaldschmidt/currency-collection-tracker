import GradingCompany from "$lib/entities/coins/grading-company.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds a particular grading company by ID. */
export const GET: RequestHandler = async function({ locals, params }) {
    const gradingCompanyRepo = locals.dataSource.getRepository(GradingCompany);
    const gradingCompany = await gradingCompanyRepo.findOneBy({ urlKey: params.companyUrlKey });

    // Did not find a grading company with that ID.
    if (!gradingCompany) {
        return ResponseHelper.jsonResponse(
            { message: 'Could not find a grading company with the URL key of ${params.companyUrlKey}.' },
            404
        );
    }

    return ResponseHelper.jsonResponse(
        { message: 'Successfully queried for the grading company.', data: gradingCompany },
        200,
    );
}