import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';
import Coin from "$lib/entities/coins/coin.entity";

export const GET: RequestHandler = async function({ locals, params }) {
    const coinRepo = locals.dataSource.getRepository(Coin);
    const coin = await coinRepo.findOne({
        where: {
            urlKey: params.coinUrlKey,
            group: { urlKey: params.groupUrlKey },
        }
    })

    // Could not find the coin.
    if (!coin) {
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