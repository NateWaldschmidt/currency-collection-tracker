import createConnection from "$lib/database/connection";
import GradeRepository from "$lib/repository/grade-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

/** @type {import('./__types/items').RequestHandler} */
export async function get(event: RequestEvent) {
    const gradeId = event.params.gradeId;

    const conn = await createConnection();
    const gradeRepo = new GradeRepository(conn);
    const grade = await gradeRepo.findById(Number.parseInt(gradeId));
    await conn.end();

    if (!grade) return ResponseHelper.createErrorResponse(
        404,
        `Could not find the grade with the ID of ${gradeId}.`
    );

    return ResponseHelper.createSuccessResponse(
        200,
        `Successfully queried a grade with the ID of ${gradeId}.`,
        grade.toJson(),
    );
}