import createConnection from "$lib/database/connection";
import UsMintRepository from "$lib/repository/us-mint-repository";
import ResponseHelper from "$lib/utilities/response-helper";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    /** The database connection. */
    const conn = await createConnection();
    /** The repository for interacting with the US mint database table. */
    const usMintRepo = new UsMintRepository(conn);
    /** All of the U.S. mints found in the database. */
    const mints = await usMintRepo.findAll();
    conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        'Successfully queried all U.S mints.',
        JSON.parse(JSON.stringify(mints)),
    );
}