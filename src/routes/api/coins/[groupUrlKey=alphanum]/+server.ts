import CoinGroupRepository from "$lib/repository/coin-group-repository";
import createConnection from "$lib/database/connection";
import ResponseHelper from "$lib/utilities/response-helper";
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