import createConnection from "$lib/server/database/connection";
import CoinStrikeRepository from "$lib/server/repository/coin-strike-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function() {
    try {
        const conn = await createConnection();
        const coinStrikeRepo = new CoinStrikeRepository(conn);
        const strikes = await coinStrikeRepo.findAll();
        conn.end();
        
        return new Response(ResponseHelper.stringifySuccessResponse(
            'Successfully queried all coin strikes.',
            strikes,
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