import createConnection from "$lib/database/connection";
import UsMintRepository from "$lib/repository/us-mint-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async function() {
    try {
        const conn = await createConnection();
        const usMintRepo = new UsMintRepository(conn);
        const mints = await usMintRepo.findAll();
        conn.end();

        return ResponseHelper.jsonResponse(
            'Successfully queried all U.S mints.',
            mints,
        );
    } catch (e) {
        return ResponseHelper.serverErrorResponse();
    }
}