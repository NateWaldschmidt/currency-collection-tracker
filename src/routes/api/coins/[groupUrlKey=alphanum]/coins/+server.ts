import createConnection from "$lib/server/database/connection";
import CoinGroupRepository from "$lib/server/repository/coin-group-repository";
import CoinRepository from "$lib/server/repository/coin-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the coins for a particular group. */
export const GET: RequestHandler = async function({ params }) {
    /** The URL key for this particular group. */
    const groupUrlKey = params.groupUrlKey;

    try {
        const conn = await createConnection();

        const coinGroupRepo = new CoinGroupRepository(conn);
        const group = await coinGroupRepo.findByUrlKey(groupUrlKey);

        // No group.
        if (!group) {
            return new Response(null, {
                'status': 404,
                'statusText': `Could not find a coin group with the URL key ${groupUrlKey}.`,
            });
        }

        const coinRepo = new CoinRepository(conn);
        const coins = await coinRepo.findByGroupId(group.id);

        return ResponseHelper.jsonResponse(
            'Successfully queried all the coins.',
            coins,
        );
    } catch (e) {
        // TODO Add logger here.
        console.error(e);
        return ResponseHelper.serverErrorResponse();
    }
}