import createConnection from "$lib/database/connection";
import UsMintRepository from "$lib/repository/us-mint-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds Mint's using their URL Key. */
export const GET: RequestHandler = async function({ params }) {
    /** The URL key being searched for. */
    const urlKey = params.mintUrlKey;

    try {
        const conn = await createConnection();
        const usMintRepo = new UsMintRepository(conn);
        const mint = await usMintRepo.findByUrlKey(urlKey);
        conn.end();

        // Did not find a grading company with that ID.
        if (!mint) {
            return new Response(null, {
                status: 404,
                statusText: `Could not find a U.S. Mint with the URL key of ${urlKey}.`,
            })
        }

        return ResponseHelper.jsonResponse(
            `Successfully queried for the U.S. Mint.`,
            mint,
        );
    } catch (e) {
        return ResponseHelper.serverErrorResponse();
    }
}