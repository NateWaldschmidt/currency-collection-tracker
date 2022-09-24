import createConnection from "$lib/database/connection";
import GradeRepository from "$lib/repository/grade-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async function({params}) {
    // Ensure the grade ID is an integer.
    if (!Number.isInteger(+params.gradeId)) {
        return new Response(null, {
            'status': 400,
            'statusText': 'The grade ID is an invalid form, must be an integer.',
        });
    }

    try {
        /** The grade ID to be found. */
        const gradeId = Number.parseInt(params.gradeId);

        const conn = await createConnection();
        const gradeRepo = new GradeRepository(conn);
        const grade = await gradeRepo.findById(gradeId);
        await conn.end();

        // Ensure the group was found.
        if (!grade) {
            return new Response(null, {
                'status': 404,
                'statusText': `Could not find the grade with the ID of ${gradeId}.`,
            });
        }

        return new Response(ResponseHelper.stringifySuccessResponse(
            `Successfully queried a grade with the ID of ${gradeId}.`,
            grade,
        ), {
            headers: {'Content-Type': 'application/json'},
        });
    } catch (e) {
        return new Response(null, {
            'status': 500,
            'statusText': ResponseHelper.GENERIC_SERVER_ERROR,
        });
    }
}