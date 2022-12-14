import Composition from "$lib/entities/composition.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ locals }) {
    const compositionRepository = locals.dataSource.getRepository(Composition);

    return ResponseHelper.jsonResponse(
        { message: 'Successfully queried all coin compositions.', data: await compositionRepository.find() },
        200,
    );
}