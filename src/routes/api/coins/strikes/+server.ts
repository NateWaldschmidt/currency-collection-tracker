import CoinStrikeRepository from "$lib/server/repository/coin-strike-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ locals }) {
    const coinStrikeRepo = new CoinStrikeRepository(locals.connection);
    const strikes = await coinStrikeRepo.findAll();
    
    return ResponseHelper.jsonResponse(
        'Successfully queried all coin strikes.',
        strikes,
    );
}