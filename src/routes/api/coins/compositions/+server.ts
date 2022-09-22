import createConnection from "$lib/database/connection";
import CoinCompositionRepository from "$lib/repository/coin-composition-repository";
import ResponseHelper from "$lib/utilities/response-helper";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    const conn = await createConnection();
    const coinCompRepo = new CoinCompositionRepository(conn);
    const groups = await coinCompRepo.findAll();
    await conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        'Successfully queried all coin compositions.',
        JSON.parse(JSON.stringify(groups)),
    );
}