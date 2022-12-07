import Coin from "$lib/entities/coins/coin.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

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
        return ResponseHelper.jsonResponse(
            { message: `Could not find a coin with the URL key ${params.coinUrlKey} in the group ${params.groupUrlKey}.` },
            404,
        );
    }

    return ResponseHelper.jsonResponse(
        { message: 'Successfully queried the coin.', data: coin },
        200,
    );
}