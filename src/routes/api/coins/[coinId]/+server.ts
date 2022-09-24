import createConnection from "$lib/database/connection";
import CoinRepository from "$lib/repository/coin-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit/types/internal";

/** Handles requests for coins by their ID. */
export const GET: RequestHandler = async function ({params}) {
    // Ensure the coin ID is an integer.
    if (!Number.isInteger(+params.coinId)) {
        return new Response(null, {
            'status': 400,
            'statusText': 'The coin ID is an invalid form, must be an integer.',
        });
    }

    /** The ID of the coin to be found. */
    const coinId = Number.parseInt(params.coinId);

    try {
        const conn = await createConnection();
        const coinRepo = new CoinRepository(conn);
        const coin = await coinRepo.findById(coinId);
        await conn.end();

        // Could not find the coin.
        if (!coin) {
            return new Response(null, {
                'status': 404,
                'statusText': `Could not find the coin with the ID of ${coinId}.`,
            });
        }
    
        return new Response(ResponseHelper.stringifySuccessResponse(
            `Successfully queried coin with the ID of ${coinId}.`,
            coin,
        ), {
            headers: {'Content-Type': 'application/json'},
        });
    } catch (e) {
        return new Response(null, {
            'status': 500,
            'statusText': ResponseHelper.GENERIC_SERVER_ERROR,
        });
    }
}