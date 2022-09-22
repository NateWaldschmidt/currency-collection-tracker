import createConnection from "$lib/database/connection";
import GradeRepository from "$lib/repository/grade-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

/** @type {import('./__types/items').RequestHandler} */
export async function get(event: RequestEvent) {
    // Queries for all grades.
    const conn      = await createConnection();
    const gradeRepo = new GradeRepository(conn);
    const grades    = await gradeRepo.findAll();
    await conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        `Successfully queried for all grades.`,
        grades,
    );
}