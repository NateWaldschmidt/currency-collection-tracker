import CoinGroupRepository from "$lib/server/repository/coin-group-repository";
import createConnection from "$lib/server/database/connection";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function() {
    /** The database connection. */
    const conn = await createConnection();
    /** The repository for interacting with the US mint database table. */
    const coinGroupRepo = new CoinGroupRepository(conn);
    /** The coin groups found in the database. */
    const groups = await coinGroupRepo.findAll();
    await conn.end();

    return new Response(ResponseHelper.stringifySuccessResponse(
        'Successfully queried all coin group.',
        groups,
    ));
}