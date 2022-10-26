import createConnection from "$lib/server/database/connection";
import CoinCompositionRepository from "$lib/server/repository/coin-composition-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Handles querying for all coin compositions. */
export const GET: RequestHandler = async function() {
    const conn = await createConnection();
    const coinCompRepo = new CoinCompositionRepository(conn);
    const groups = await coinCompRepo.findAll();
    await conn.end();

    return new Response(ResponseHelper.stringifySuccessResponse(
        'Successfully queried all coin compositions.',
        groups,
    ), {
        headers: {'Content-Type': 'application/json'},
    });
}