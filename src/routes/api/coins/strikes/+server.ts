import CoinStrike from "$lib/entities/coins/coin-strike.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ locals }) {
    const coinStrikeRepo = locals.dataSource.getRepository(CoinStrike);
    
    return ResponseHelper.jsonResponse(
        'Successfully queried all coin strikes.',
        await coinStrikeRepo.find(),
    );
}