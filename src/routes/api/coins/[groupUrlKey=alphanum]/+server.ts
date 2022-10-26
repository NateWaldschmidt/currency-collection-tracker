import CoinGroupRepository from "$lib/server/repository/coin-group-repository";
import createConnection from "$lib/server/database/connection";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function({ params }) {
    try {
        const conn = await createConnection();
        const coinGroupRepo = new CoinGroupRepository(conn);
        const group = await coinGroupRepo.findByUrlKey(params.groupUrlKey);
        await conn.end();

        return ResponseHelper.jsonResponse(
            'Successfully queried the coin group.',
            group,
        );
    } catch (e) {
        // TODO Add logger here.
        console.error(e);
        return ResponseHelper.serverErrorResponse();
    }
}