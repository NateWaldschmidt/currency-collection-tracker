import GradeRepository from "$lib/server/repository/grade-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async function({ locals, params }) {
    /** The grade ID to be found. */
    const gradeId = Number.parseInt(params.gradeId);

    const gradeRepo = new GradeRepository(locals.connection);
    const grade = await gradeRepo.findById(gradeId);

    // Ensure the group was found.
    if (!grade) {
        return new Response(null, {
            'status': 404,
            'statusText': `Could not find the grade with the ID of ${gradeId}.`,
        });
    }

    return ResponseHelper.jsonResponse(
        `Successfully queried a grade with the ID of ${gradeId}.`,
        grade,
    );
}