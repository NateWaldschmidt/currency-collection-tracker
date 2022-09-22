import createConnection         from "$lib/database/connection";
import GradingCompanyRepository from "$lib/repository/grading-company-repository";
import ResponseHelper           from "$lib/utilities/response-helper";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    const conn = await createConnection();
    const gradingCompanyRepo = new GradingCompanyRepository(conn);
    const gradingCompanies = await gradingCompanyRepo.findAll();
    conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        `Successfully queried for all the grading companies.`,
        JSON.parse(JSON.stringify(gradingCompanies)),
    );
}