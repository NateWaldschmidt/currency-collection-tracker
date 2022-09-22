import createConnection from "$lib/database/connection";
import GradingCompanyRepository from "$lib/repository/grading-company-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event: RequestEvent) {
    /** The passed in coin group ID. */
    const companyId = Number.parseInt(event.params.companyId);

    const conn = await createConnection();
    const gradingCompanyRepo = new GradingCompanyRepository(conn);
    const gradingCompanies = await gradingCompanyRepo.findById(companyId);
    conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        `Successfully queried for the grading company with the ID ${companyId}.`,
        JSON.parse(JSON.stringify(gradingCompanies)),
    );
}