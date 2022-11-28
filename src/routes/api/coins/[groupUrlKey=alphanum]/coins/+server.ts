import Coin from "$lib/entities/coins/coin.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all the coins for a particular group. */
export const GET: RequestHandler = async function({ locals, params }) {
    const coinRepo = locals.dataSource.getRepository(Coin);
    const coins    = await coinRepo.find({
        where: {
            group: { urlKey: params.groupUrlKey }
        }
    });

    console.log(coins);

    return ResponseHelper.jsonResponse(
        'Successfully queried all the coins.',
        coins,
    );
}