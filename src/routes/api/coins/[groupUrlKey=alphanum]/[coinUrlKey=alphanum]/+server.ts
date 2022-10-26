import createConnection from "$lib/server/database/connection";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';
import CoinRepository from "$lib/server/repository/coin-repository";
import CoinGroupRepository from "$lib/server/repository/coin-group-repository";

export const GET: RequestHandler = async function({ params }) {

    try {
        const conn = await createConnection();
        const coinGroupRepo = new CoinGroupRepository(conn);
        const group = await coinGroupRepo.findByUrlKey(params.groupUrlKey);

        // Could not find the coin group.
        if (!group) {
            await conn.end();
            return new Response(null, {
                'status': 404,
                'statusText': `Could not find a coin group with the URL key ${params.groupUrlKey}.`,
            });
        }

        const coinRepo = new CoinRepository(conn);
        const coin = await coinRepo.findByUrlKey(params.coinUrlKey, group.id);

        // Could not find the coin.
        if (!group) {
            await conn.end();
            return new Response(null, {
                'status': 404,
                'statusText': `Could not find a coin with the URL key ${params.coinUrlKey} in the group ${params.groupUrlKey}.`,
            });
        }

        await conn.end();

        return ResponseHelper.jsonResponse(
            'Successfully queried the coin.',
            coin,
        );
    } catch (e) {
        // TODO Add logger here.
        console.error(e);
        return ResponseHelper.serverErrorResponse();
    }
}