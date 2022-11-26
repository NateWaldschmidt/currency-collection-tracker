import GradeRepository from "$lib/server/repository/grade-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Finds all grades. */
export const GET: RequestHandler = async function({ locals }) {
    const gradeRepo = new GradeRepository(locals.connection);
    const grades    = await gradeRepo.findAll();

    return ResponseHelper.jsonResponse(
        'Successfully queried all coin strikes.',
        grades,
    )
}