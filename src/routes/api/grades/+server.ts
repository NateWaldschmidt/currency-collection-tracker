import createConnection from "$lib/server/database/connection";
import GradeRepository from "$lib/server/repository/grade-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds all grades. */
export const GET: RequestHandler = async function() {
    try {
        // Queries for all grades.
        const conn      = await createConnection();
        const gradeRepo = new GradeRepository(conn);
        const grades    = await gradeRepo.findAll();
        await conn.end();

        return new Response(ResponseHelper.stringifySuccessResponse(
            'Successfully queried all coin strikes.',
            grades,
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