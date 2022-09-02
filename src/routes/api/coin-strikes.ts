import createConnection from "$lib/database/connection";
import CoinStrikeRepository from "$lib/repository/coin-strike-repository";
import ResponseHelper from "$lib/utilities/response-helper";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    /** The database connection. */
    const conn = await createConnection();
    /** The repository for interacting with the US mint database table. */
    const coinStrikeRepo = new CoinStrikeRepository(conn);
    /** The strikes found in the database. */
    const strikes = await coinStrikeRepo.findAll();
    conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        'Successfully queried all coin strikes.',
        JSON.parse(JSON.stringify(strikes)),
    );
}