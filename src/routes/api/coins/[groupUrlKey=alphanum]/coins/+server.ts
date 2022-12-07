import Coin from "$lib/entities/coins/coin.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the coins for a particular group. */
export const GET: RequestHandler = async function({ locals, params }) {
    const coinRepo = locals.dataSource.getRepository(Coin);
    const coins = await coinRepo.findBy({ group: { urlKey: params.groupUrlKey }});

    return ResponseHelper.jsonResponse(
        { message: 'Successfully queried all the coins.', data: coins },
        200,
    );
}