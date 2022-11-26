import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';
import CoinRepository from "$lib/server/repository/coin-repository";
import CoinGroupRepository from "$lib/server/repository/coin-group-repository";

export const GET: RequestHandler = async function({ locals, params }) {
    const coinGroupRepo = new CoinGroupRepository(locals.connection);
    const group = await coinGroupRepo.findByUrlKey(params.groupUrlKey);

    // Could not find the coin group.
    if (!group) {
        return new Response(null, {
            'status': 404,
            'statusText': `Could not find a coin group with the URL key ${params.groupUrlKey}.`,
        });
    }

    const coinRepo = new CoinRepository(locals.connection);
    const coin = await coinRepo.findByUrlKey(params.coinUrlKey, group.id);

    // Could not find the coin.
    if (!group) {
        return new Response(null, {
            'status': 404,
            'statusText': `Could not find a coin with the URL key ${params.coinUrlKey} in the group ${params.groupUrlKey}.`,
        });
    }

    return ResponseHelper.jsonResponse(
        'Successfully queried the coin.',
        coin,
    );
}