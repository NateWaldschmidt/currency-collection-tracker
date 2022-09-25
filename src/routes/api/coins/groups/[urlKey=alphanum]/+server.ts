import CoinGroupRepository from "$lib/repository/coin-group-repository";
import createConnection from "$lib/database/connection";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function({ params }) {
    /** The URL key to be found for the coin group. */
    const urlKey = params.urlKey;

    try {
        const conn = await createConnection();
        const coinGroupRepo = new CoinGroupRepository(conn);
        const group = await coinGroupRepo.findByUrlKey(urlKey);
        await conn.end();

        return ResponseHelper.jsonResponse(
            'Successfully queried the coin group.',
            group,
        );
    } catch (e) {
        return ResponseHelper.serverErrorResponse();
    }
}