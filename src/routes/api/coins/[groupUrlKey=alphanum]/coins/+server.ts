import CoinGroupRepository from "$lib/server/repository/coin-group-repository";
import CoinRepository from "$lib/server/repository/coin-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the coins for a particular group. */
export const GET: RequestHandler = async function({ locals, params }) {
    const coinGroupRepo = new CoinGroupRepository(locals.connection);
    const group = await coinGroupRepo.findByUrlKey(params.groupUrlKey);

    // No group.
    if (!group) {
        return new Response(null, {
            'status': 404,
            'statusText': `Could not find a coin group with the URL key ${params.groupUrlKey}.`,
        });
    }

    const coinRepo = new CoinRepository(locals.connection);
    const coins = await coinRepo.findByGroupId(group.id);

    return ResponseHelper.jsonResponse(
        'Successfully queried all the coins.',
        coins,
    );
}