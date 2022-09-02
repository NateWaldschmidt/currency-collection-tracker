import createConnection from "$lib/database/connection";
import CoinGroupRepository from "$lib/repository/coin-group-repository";
import ResponseHelper from "$lib/utilities/response-helper";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    /** The database connection. */
    const conn = await createConnection();
    /** The repository for interacting with the US mint database table. */
    const coinGroupRepo = new CoinGroupRepository(conn);
    /** The coin groups found in the database. */
    const groups = await coinGroupRepo.findAll();
    await conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        'Successfully queried all coin group.',
        JSON.parse(JSON.stringify(groups)),
    );
}