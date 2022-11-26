import CoinCompositionRepository from "$lib/server/repository/coin-composition-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Handles querying for all coin compositions. */
export const GET: RequestHandler = async function({ locals }) {
    const coinCompRepo = new CoinCompositionRepository(locals.connection);
    const groups = await coinCompRepo.findAll();

    return new Response(ResponseHelper.stringifySuccessResponse(
        'Successfully queried all coin compositions.',
        groups,
    ), {
        headers: {'Content-Type': 'application/json'},
    });
}